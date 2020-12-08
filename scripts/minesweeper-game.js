window.onload = function() {
    ctx = document.getElementById('game').getContext('2d');

    // Event listeners
    document.getElementById('game').addEventListener('click', function(e) {
        let pos = realPos(e.pageX, e.pageY);
        mouseState.click = [pos[0], pos[1], 1];
	});
	
    document.getElementById('game').addEventListener('mousemove',
        function(e) {
            let pos = realPos(e.pageX, e.pageY);
            mouseState.x = pos[0];
            mouseState.y = pos[1];
        });

    document.getElementById('game').addEventListener('contextmenu',
        function(e) {
            e.preventDefault();
            let pos = realPos(e.pageX, e.pageY);
            mouseState.click = [pos[0], pos[1], 2];
            return false;
        });

    requestAnimationFrame(drawGame);
};

function realPos(x, y) {
    let p = document.getElementById('game');

    do {
        x -= p.offsetLeft;
        y -= p.offsetTop;

        p = p.offsetParent;
    } while (p != null);

    return [x, y];
}