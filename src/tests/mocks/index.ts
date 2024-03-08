import { UserCreate, SessionCreate, BookCreate } from "../../interfaces";

export const mockedUser: UserCreate = {
  name: "Test Name",
  email: "testemail@mail.com",
  birthday: "19/06/2002",
  password: "1234",
  admin: false,
};

export const mockedUserAdm: UserCreate = {
  name: "Test Admin Name",
  email: "testemail2@mail.com",
  birthday: "29/08/2002",
  password: "1234",
  admin: true,
};
export const mockedUserLogin: SessionCreate = {
  email: "testemail@mail.com",
  password: "1234",
};
export const mockedUserAdminLogin: SessionCreate = {
  email: "testemail2@mail.com",
  password: "1234",
};

export const mockedBook: BookCreate = {
  title: "I’m Not That Kind of Talent",
  author: "Denphy",
  description:
    "Eu não sou esse tipo de pessoa.Eu, Deon Hart, sou um enfermo que vomita sangue sempre que estou estressado.No entanto, ao mesmo tempo, sou o Conde Hart, que de alguma forma foi incompreendido e considerado uma pessoa forte e, portanto, temido por todos.",
  type: "Manhwa",
  cover:
    "https://cdn.anime-planet.com/manga/primary/im-not-that-kind-of-talent-1.webp?t=1681353982",
  launched_in: "2022",
  status: "Em lançamento",
  genres: ["Ação", "Aventura", "Drama", "Fantasia", "Shounen"],
};
