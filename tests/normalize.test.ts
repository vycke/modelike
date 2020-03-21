import { normalize, denormalize, schema } from '../src/normalize';

const likeSchema = schema('likes');
const companySchema = schema('companies', { likes: [likeSchema] });
const userSchema = schema('users', {
  likes: [likeSchema],
  company: companySchema
});

const user1 = {
  id: 1,
  name: 'User 1',
  interests: ['test'],
  likes: [
    { id: 1, name: 'Like 1' },
    { id: 2, name: 'Like 2' }
  ],
  company: {
    id: 1,
    name: 'Company 1',
    likes: [{ id: 1, name: 'Like 1' }]
  }
};

const user2 = {
  id: 2,
  name: 'User 2',
  likes: [
    { id: 1, name: 'Like 1' },
    { id: 3, name: 'Like 3' }
  ]
};

const output1 = {
  users: [
    {
      id: 1,
      interests: ['test'],
      name: 'User 1',
      likes: [1, 2],
      company: 1
    }
  ],
  likes: [
    { id: 1, name: 'Like 1' },
    { id: 2, name: 'Like 2' }
  ],
  companies: [{ id: 1, name: 'Company 1', likes: [1] }]
};

const output2 = {
  users: [
    {
      id: 1,
      name: 'User 1',
      interests: ['test'],
      likes: [1, 2],
      company: 1
    },
    {
      id: 2,
      name: 'User 2',
      likes: [1, 3]
    }
  ],
  likes: [
    { id: 1, name: 'Like 1' },
    { id: 2, name: 'Like 2' },
    { id: 3, name: 'Like 3' }
  ],
  companies: [{ id: 1, name: 'Company 1', likes: [1] }]
};

it('normalize & denormalize', () => {
  expect(normalize(user1, userSchema)).toEqual(output1);
  expect(normalize([user1, user2], userSchema)).toEqual(output2);
  expect(denormalize(output1, userSchema)).toEqual(user1);
  expect(denormalize(output2, userSchema)).toEqual([user1, user2]);
});
