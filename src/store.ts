import { configureStore } from "@reduxjs/toolkit";
import Main from "./assets/redux/main";

export default configureStore({
  reducer: {
    main: Main,
  },
});
