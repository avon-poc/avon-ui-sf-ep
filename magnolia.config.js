import {
  SfSection,
} from '@storefront-ui/vue';
import Basic from './pages/Basic';
import Home from './pages/Home';
import AppHeader from "./components/AppHeader"
//import MyAccount from './pages/MyAccount';
//import Product from "./pages/Product"
/*import Contact from './pages/Contact';
import Image from './components/Image';
import Headline from './components/Headline';*/
import Paragraph from './components/Paragraph';
/*import List from './components/List';
import Item from './components/Item';
import Expander from './components/Expander';*/

const config = {
  componentMappings: {
    // Pages
    'vue-storefront:pages/basic': Home,
    //'vue-storefront:pages/myaccount': MyAccount,
    //'vue-storefront:pages/product': Product,
    // Components
    'vue-storefront:components/section': SfSection,    
    'spa-lm:components/headline': AppHeader,
    //'spa-lm:components/image': Image,
    'spa-lm:components/paragraph': Paragraph,
    //'spa-lm:components/list': List,
    //'spa-lm:components/listItem': Item,
    //'spa-lm:components/expander': Expander,
  },
};

export default config;