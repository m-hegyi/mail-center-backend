const typeorm: any = jest.createMockFromModule('typeorm');

export default typeorm;

export const PrimaryGeneratedColumn = () => () => {};
export const ManyToOne = () => () => {};
export const OneToOne = () => () => {};
export const OneToMany = () => () => {};
export const JoinColumn = () => () => {};
export const Column = () => () => {};
export const CreateDateColumn = () => () => {};
export const UpdateDateColumn = () => () => {};
export const Entity = () => () => {};
export const PrimaryColumn = () => () => {};
export const BeforeInsert = () => () => {};
export const getRepository = (test: string) => ({
  findOne: () => {},
  find: () => {},
  save: () => {},
});
