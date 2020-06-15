new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function () {
            var dmg = this.calcDmg(3, 10);
            this.monsterHealth -= dmg;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + dmg
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
            this.checkWin();
        },
        specialAttack: function () {
            var dmg = this.calcDmg(10, 20);
            this.monsterHealth -= dmg;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits hard Monster for ' + dmg
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
            this.checkWin();
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10HP'
            });
            this.monsterAttacks();
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        monsterAttacks: function () {
            var dmg = this.calcDmg(5, 12);
            this.playerHealth -= dmg;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + dmg
            });
        },
        calcDmg: function (min, max) {
            return dmg = Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You Won! New game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You Lost! New game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
})