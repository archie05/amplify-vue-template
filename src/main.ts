import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import { Amplify } from "aws-amplify";
//TODO: Enable the below when deploying to AWS Amplify and disable when working locally
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

createApp(App).mount("#app");
