import { TypedObject, Primitive } from './types';

type Relations = TypedObject<Schema | Schema[]>;
type Result = TypedObject<Entity[]>;

type Schema = {
  name: string;
  relations?: Relations;
};

type Entity = {
  id: number | string;
  [key: string]: undefined | Primitive | Primitive[] | Entity | Entity[];
};

// Helper function to create a schema required for normalization and denormalization
export function schema(name: string, relations?: Relations): Schema {
  return { name, relations };
}

// Normalization function
export function normalize(input: Entity | Entity[], schema: Schema): Result {
  const result: Result = { [schema.name]: [] };

  function visit(entity: Entity, s: Schema): void {
    const { name, relations } = s;
    if (!result[name]) result[name] = [];
    if (result[name].find((r) => r.id === entity.id)) return;

    const index = result[name].push({ ...entity });
    if (!relations) return;

    // helper
    function find(rel: Entity | Entity[]): Primitive | Primitive[] {
      return Array.isArray(rel) ? rel.map((i) => i.id) : rel.id;
    }

    // Go over all properties in the schema
    Object.entries(relations).forEach(([key, schema]) => {
      const relEntities = entity[key];
      if (!relEntities) return;
      result[name][index - 1][key] = find(relEntities as Entity | Entity[]);
      // Recursive call
      if (Array.isArray(schema))
        (relEntities as Entity[]).forEach((r) => visit(r, schema[0]));
      else visit(relEntities as Entity, schema as Schema);
    });
  }

  if (Array.isArray(input)) input.forEach((i) => visit(i, schema));
  else visit(input, schema);

  return result;
}

// Denormalization function
export function denormalize(input: Result, schema: Schema): Entity | Entity[] {
  let result: Entity[] = input[schema.name];

  function visit(entity: Entity, s: Schema): Entity {
    const { relations } = s;
    if (!relations) return entity;

    // Recursive call
    function find(id: Primitive, schema: Schema): Entity {
      const entity = input[schema.name].find((v) => v.id === id) as Entity;
      return visit(entity, schema);
    }

    const newEntity = { ...entity };

    // go over all properties from the schema
    Object.entries(relations).forEach(([key, schema]) => {
      if (!newEntity[key]) return;
      if (Array.isArray(schema))
        newEntity[key] = (newEntity[key] as Primitive[]).map((e) =>
          find(e, schema[0])
        );
      else newEntity[key] = find(newEntity[key] as Primitive, schema);
    });

    return newEntity;
  }

  result = result.map((r) => visit(r, schema));
  if (result.length === 1) return result[0];
  return result;
}
