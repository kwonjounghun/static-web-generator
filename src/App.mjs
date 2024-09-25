import Index from './pages/index.mjs';
import Detail from './pages/detail.mjs';
import List from './pages/list.mjs';
import router from './helpers/clientRouter.mjs';

function App() {
    router({
        '/index.html': Index,
        '/list.html': List,
        '/detail.html': Detail,
    });
};

export default App;
