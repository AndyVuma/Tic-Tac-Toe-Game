$(document).ready(function() {
    var player = 1;
    var player1Selections = [];
    var player2Selections = [];
    var winningCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    var player1Score = 0;
    var player2Score = 0;
    /*
    // Add sound effect when a player makes a move
    var moveSound = new Audio('move-sound.mp3');
*/
    // Add sound effect when the game ends
    var endGameSound = new Audio('win-sound.mp3');

    function checkWinner(selections) {
        for (var i = 0; i < winningCombinations.length; i++) {
            var matches = 0;
            for (var j = 0; j < winningCombinations[i].length; j++) {
                if ($.inArray(winningCombinations[i][j], selections) >= 0) {
                    matches++;
                } else {
                    break;
                }
            }
            if (matches === 3) {
                alert('Player ' + player + ' wins!');
                endGameSound.play();
                if (player === 1) {
                    player1Score++;
                    $('#player1').text('Player 1: ' + player1Score);
                } else {
                    player2Score++;
                    $('#player2').text('Player 2: ' + player2Score);
                }
                resetGame();
            } else if (player1Selections.length + player2Selections.length === 9) {
                alert('Tie game!');
                endGameSound.play();
                resetGame();
            }
        }
    }

    function resetGame() {
        player1Selections = [];
        player2Selections = [];
        $('.tic-tac-toe-cell').text('');
    }

    $('.tic-tac-toe-cell').click(function() {
        if ($(this).text() === '') {
            if (player === 1) {
                $(this).text('X');
                player1Selections.push(parseInt(this.id.substr(-1)));
                checkWinner(player1Selections);
                player = 2;
            } else {
                $(this).text('O');
                player2Selections.push(parseInt(this.id.substr(-1)));
                checkWinner(player2Selections);
                player = 1;
            }
            moveSound.play();
        }
    });
});
