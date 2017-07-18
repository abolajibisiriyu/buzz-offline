if (navigator.serviceWorker) {

    navigator.serviceWorker.register('../sw.js').then(function(reg) {
        if (!navigator.serviceWorker.controller) {
            return;
        }
        if (reg.waiting) {
            _updateReady(reg.waiting);
            return;
        }
        if (reg.installing) {
            _trackInstalling(reg.installing);
            return;
        }
        reg.addEventListener('updatefound', function() {
            _trackInstalling(reg.installing);
        });
    });
}


function _updateReady(worker) {
    if (confirm('A new version of the app has been recieved, press ok to refresh page')) {
        worker.postMessage({ action: 'skipWaiting' });
        location.reload();
    }
}

function _trackInstalling(worker) {
    worker.addEventListener('statechange', function() {
        if (worker.state == 'installed') {
            _updateReady(worker);
        }
    });
}