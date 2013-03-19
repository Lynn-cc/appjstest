var $$ = function(c) {
    return document.getElementsByClassName(c);
}

var $ = function $(i) {
    return document.getElementById(i);
}

var $main = $('main');
var $container = $$('container')[0];

var game = {
    total: 0,
    start: function() {
        var max = this.max = 100;
        if (!this.hasStart) {
            this.hasStart = true;
            this.bindEvent();
            this.create(max);
            this.randomMe(max);
            this.cutOthers = this.initCutOthers(max);
        } else {
            this.restart();
        }
    },
    restart: function() {
        var max = this.max;
        this.create(max);
        this.randomMe(max);
        this.cutOthers = this.initCutOthers(max);
    },
    clear: function() {
        $container.innerHTML = '';
        this.me = null;
        this.total = 0;
    },
    create: function(num) {
        var one;
        $main.className = '';
        for (var i = 0; i < num; i++) {
            one = document.createElement('div');
            one.className = 'one';
            one.setAttribute('number', i + '');
            $container.appendChild(one);
        }
    },
    bindEvent: function() {
        var that = this;
        $container.addEventListener('click', function(e) {
            var target = e.target;
            if (target.className === 'one') {
                var number = parseInt(target.getAttribute('number'));
                that.catchHandler(number, target);
            }
        });
    },
    catchHandler: function(num) {
        if (num < this.me) {
            this.cutOthers(num, null);
        } else if (num > this.me) {
            this.cutOthers(null, num);
        } else {
            this.foundMe();
        }
    },
    randomMe: function(max) {
        max = max || 100;
        this.me = Math.floor(Math.random() * max) + 1;
    },
    initCutOthers: function(max) {
        var that = this,
        left = 0,
        right = max - 1,
        eles = document.getElementsByClassName('one'),
        boundary = {
            left: 0,
            right: 0
        };
        return function(l, r) {
            if (l) {
                boundary.left = left;
                boundary.right = l;
                left = l + 1;
            } else if (r) {
                boundary.left = r;
                boundary.right = right;
                right = r - 1;
            }
            that.total += boundary.right - boundary.left + 1;
            if (that.total === that.max - 1) {
                that.foundMe();
                return;
            }

            var cutEles = [].slice.call(eles, boundary.left, boundary.right + 1);
            if (r) {
                cutEles.reverse();
            }
            that.initFade(cutEles, function(el) {
                el.className = 'one pass';
            });
            //for (var i = 0; i < cutEles.length; i++) {
            //    cutEles[i].className = 'one pass';
            //}
        }
    },
    initFade: function(arr, fn) {
        var i = 0;
        var myFnc = function() {
            if (arr[i]) {
                setTimeout(function() {
                    fn(arr[i]);
                    i++;
                    myFnc();
                }, 40);
            }
        };
        myFnc();
    },
    foundMe: function() {
        var remains = document.getElementsByClassName('one');
        var that = this;
        for (var i = 0; i < remains.length; i++) {
            if (remains[i].getAttribute('number') * 1 === this.me) {
                remains[i].className = 'one me';
            } else {
                remains[i].className = 'one pass';
            }
        }
        setTimeout(function() {
            that.clear();
            $main.className = 'win';
        }, 500);
    }
}

window.addEventListener('start', function(e) {
    game.start();
});

$$('restart')[0].addEventListener('click', function(e) {
    game.start();
});
