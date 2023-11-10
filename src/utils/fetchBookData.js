import axios from "axios";

export const fetchBookData = async (search) => {
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyCyS-37b5ei8tlT1cfnxsUC55DJts93yKM`
  );
  return response.data
};

