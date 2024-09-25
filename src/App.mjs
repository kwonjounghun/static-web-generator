import Index from './pages/index.mjs';
import Detail from './pages/detail.mjs';
import List from './pages/list.mjs';
import router from './helpers/clientRouter.mjs';

function App() {
    router({
        '/': Index,
        '/list': List,
        '/detail': Detail,
    });
};

export default App;
