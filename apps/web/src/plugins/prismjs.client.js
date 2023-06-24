import Prism from "prismjs";
import '~/assets/prism/prism-theme.css';
Prism.manual = true;
//need to use my own script because autoloader ignoored cdn path
import "~/assets/prism/prism-autoloader.js";
export default defineNuxtPlugin(Prism);