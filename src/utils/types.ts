import { SortBy } from 'src/utils/enum';

export type CreateTypeUser = {
  username: string;
  email: string;
};

export type GetListUserType = {
  sortBy?: SortBy;
  page: number;
  limit: number;
};
