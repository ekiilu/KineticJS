suite('Node', function() {

    // ======================================================
    test('getType and getClassName', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        stage.add(layer.add(group.add(circle)));

        //console.log(stage.getType());

        assert.equal(stage.getType(), 'Stage');
        assert.equal(layer.getType(), 'Layer');
        assert.equal(group.getType(), 'Group');
        assert.equal(circle.getType(), 'Shape');

        assert.equal(stage.getClassName(), 'Stage');
        assert.equal(layer.getClassName(), 'Layer');
        assert.equal(group.getClassName(), 'Group');
        assert.equal(circle.getClassName(), 'Circle');


    });
    // ======================================================
    test('get layer', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });
        assert.equal(circle.getLayer(), null);

        stage.add(layer.add(circle));
        assert.equal(circle.getLayer(), layer);

    });
    // ======================================================
    test('setAttr', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        stage.add(layer.add(circle));

        circle.setAttr('fill', 'red');
        layer.draw();

        assert.equal(circle.getFill(), 'red');

        circle.setAttr('position', {x: 5, y: 6});

        assert.equal(circle.getX(), 5);
        assert.equal(circle.getY(), 6);

        circle.setAttr('foobar', 12);

        assert.equal(circle.getAttr('foobar'), 12);

    });

    // ======================================================
    test('set shape and layer opacity to 0.5', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        circle.setOpacity(0.5);
        layer.setOpacity(0.5);
        layer.add(circle);
        stage.add(layer);

        assert.equal(circle.getAbsoluteOpacity(), 0.25);
        assert.equal(layer.getAbsoluteOpacity(), 0.5);
    });

    // ======================================================
    test('transform cache', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        assert.equal(circle._cache.transform, undefined);

        layer.add(circle);
        stage.add(layer);

        // transform cache
        assert.notEqual(circle._cache.transform, undefined);
        circle.setX(100);
        assert.equal(circle._cache.transform, undefined);
        layer.draw();
        assert.notEqual(circle._cache.transform, undefined);
    });

    // ======================================================
    test('visible cache', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });
        layer.add(circle);
        stage.add(layer);

        // visible cache
        assert.equal(circle._cache.visible, true);
        circle.hide();
        assert.equal(circle._cache.visible, undefined);
        stage.draw();
        assert.equal(circle._cache.visible, false);
        circle.show();
        assert.equal(circle._cache.visible, undefined);
        layer.draw();
        assert.equal(circle._cache.visible, true);

    });

    // ======================================================
    test('shadow cache', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });
        layer.add(circle);
        stage.add(layer);

        // shadow cache
        assert.equal(circle._cache.hasShadow, false);
        circle.setShadowColor('red');
        circle.setShadowOffset(10);
        assert.equal(circle._cache.hasShadow, undefined);
        layer.draw();
        assert.equal(circle._cache.hasShadow, true);
        layer.draw();
        assert.equal(circle._cache.hasShadow, true);

    });

    // ======================================================
    test('opacity cache', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });
        layer.add(circle);
        stage.add(layer);

        // opacity cache
        assert.equal(circle._cache.absoluteOpacity, 1);
        circle.setOpacity(0.5);
        assert.equal(circle._cache.absoluteOpacity, undefined);
        layer.draw();
        assert.equal(circle._cache.absoluteOpacity, 0.5);

    });

    // ======================================================
    test('listening cache', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });
        layer.add(circle);
        stage.add(layer);

        // listening cache
        
        // prime the cache
        circle.isListening();

        assert.equal(circle._cache.listening, true);
        circle.setListening(false);
        assert.equal(circle._cache.listening, undefined);
        circle.isListening();
        assert.equal(circle._cache.listening, false);

    });

    // ======================================================
    test('stage cache', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });
        layer.add(circle);
        stage.add(layer);

        // stage cache
        var st = circle.getStage();
        assert.equal(circle._cache.stage._id, stage._id);

    });

    // ======================================================
    test('test pixel ratio toDataURL', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();

        // override pixel ratio

        layer.canvas = new Kinetic.SceneCanvas({
           pixelRatio: 2
        });
        layer.canvas._canvas.style.position = 'absolute';

        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        layer.add(circle);
        stage.add(layer);

        assert.equal(layer.canvas.pixelRatio, 2);

    });

    // ======================================================
    test('listen and don\'t listen', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 50,
            y: 50,
            width: 200,
            height: 50,
            fill: 'blue'
        });

        var rect2 = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 200,
            height: 50,
            fill: 'red',
            listening: false
        });

        layer.add(rect).add(rect2);
        stage.add(layer);

        assert.equal(rect.getListening(), 'inherit');

        assert.equal(rect.isListening(), true);
        rect.setListening(false);
        assert.equal(rect.getListening(), false);

        assert.equal(rect2.getListening(), false);
        rect2.setListening(true);
        assert.equal(rect2.getListening(), true);
    });

    // ======================================================
    test('listen and don\'t listen with one shape', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 50,
            y: 50,
            width: 200,
            height: 50,
            fill: 'blue'
        });

        layer.add(rect);
        stage.add(layer);

        rect.setListening(false);
        layer.drawHit();

        showHit(layer);
    });

    // ======================================================
    test('test offset attr change', function() {
        /*
         * the premise of this test to make sure that only
         * root level attributes trigger an attr change event.
         * for this test, we have two offset properties.  one
         * is in the root level, and the other is inside the shadow
         * object
         */
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 50,
            y: 50,
            width: 200,
            height: 50,
            fill: 'blue',
            offset: {x:10, y:10},
            shadowColor: 'black',
            shadowOffset: {x:20, y:20}
        });

        layer.add(rect);
        stage.add(layer);

        var offsetChange = false;
        var shadowOffsetChange = false;

        rect.on('offsetChange', function(val) {
            offsetChange = true;
        });

        rect.setOffset({x:1, y:2});

        assert.equal(offsetChange, true);
    });

    // ======================================================
    test('simple clone', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();

        var rect = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            stroke: 'red'
        });

        var clone = rect.clone({
            stroke: 'green'
        });

        layer.add(clone);
        stage.add(layer);

        assert.equal(rect.getStroke(), 'red');
        assert.equal(clone.getStroke(), 'green');
    });

    // ======================================================
    test('complex clone', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 50,
            y: 50,
            width: 200,
            height: 50,
            fill: 'blue',
            offset: [10, 10],
            shadowColor: 'black',
            shadowOffset: [20, 20],
            draggable: true,
            name: 'myRect'
        });

        var clicks = [];

        rect.on('click', function() {
            clicks.push(this.getName());
        });
        var clone = rect.clone({
            x: 300,
            fill: 'red',
            name: 'rectClone'
        });

        assert.equal(clone.getX(), 300);
        assert.equal(clone.getY(), 50);
        assert.equal(clone.getWidth(), 200);
        assert.equal(clone.getHeight(), 50);
        assert.equal(clone.getFill(), 'red');

        assert.equal(rect.getShadowColor(), 'black');
        assert.equal(clone.getShadowColor(), 'black');

        clone.setShadowColor('green');

        /*
         * Make sure that when we change a clone object attr that the rect object
         * attr isn't updated by reference
         */

        assert.equal(rect.getShadowColor(), 'black');
        assert.equal(clone.getShadowColor(), 'green');

        layer.add(rect);
        layer.add(clone);
        stage.add(layer);

        // make sure private ids are different
        assert(rect._id !== clone._id, 'rect and clone ids should be different');

        // test user event binding cloning
        assert.equal(clicks.length, 0);
        rect.fire('click');
        assert.equal(clicks.toString(), 'myRect');
        clone.fire('click');
        assert.equal(clicks.toString(), 'myRect,rectClone');
    });

    // ======================================================
    test('clone a group', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group({
            x: 50,
            draggable: true,
            name: 'myGroup'
        });

        var rect = new Kinetic.Rect({
            x: 0,
            y: 50,
            width: 200,
            height: 50,
            fill: 'red',
            offset: [10, 10],
            shadowColor: 'black',
            shadowOffset: [20, 20],
            name: 'myRect',
            myAttr: 'group rect'
        });
        var text = new Kinetic.Text({
            x: 0,
            y: 110,
            text: 'Some awesome text!',
            fontSize: 14,
            fontFamily: 'Calibri',
            fill: 'blue',
            name: 'myText'
        });
        group.add(rect);
        group.add(text);

        var clicks = [];
        var taps = [];

        group.on('click', function() {
            clicks.push(this.getName());
        });
        rect.on('tap', function() {
            taps.push(this.attrs.myAttr);
        });
        var clone = group.clone({
            x: 300,
            name: 'groupClone'
        });

        showHit(layer);

        layer.add(group);
        layer.add(clone);
        stage.add(layer);

        assert.equal(clone.getX(), 300);
        assert.equal(clone.getY(), 0);
        assert.equal(clone.getDraggable(), true);
        // test alias
        assert.equal(clone.isDraggable(), true);
        assert.equal(clone.getName(), 'groupClone');

        assert.equal(group.getChildren().length, 2);
        assert.equal(clone.getChildren().length, 2);
        assert.equal(group.find('.myText')[0].getFill(), 'blue');
        assert.equal(clone.find('.myText')[0].getFill(), 'blue');
        clone.find('.myText')[0].setFill('black');
        assert.equal(group.find('.myRect')[0].attrs.myAttr, 'group rect');
        assert.equal(clone.find('.myRect')[0].attrs.myAttr, 'group rect');
        clone.find('.myRect')[0].setAttrs({
            myAttr: 'clone rect'
        });

        // Make sure that when we change a clone object attr that the rect object
        // attr isn't updated by reference

        assert.equal(group.find('.myText')[0].getFill(), 'blue');
        assert.equal(clone.find('.myText')[0].getFill(), 'black');

        assert.equal(group.find('.myRect')[0].attrs.myAttr, 'group rect');
        assert.equal(clone.find('.myRect')[0].attrs.myAttr, 'clone rect');

        // make sure private ids are different
        assert.notEqual(group._id, clone._id);

        // make sure childrens private ids are different
        assert.notEqual(group.find('.myRect')[0]._id, clone.find('.myRect')[0]._id);
        assert.notEqual(group.find('.myText')[0]._id, clone.find('.myText')[0]._id);

        // test user event binding cloning
        assert.equal(clicks.length, 0);
        group.fire('click');
        assert.equal(clicks.toString(), 'myGroup');
        clone.fire('click');
        assert.equal(clicks.toString(), 'myGroup,groupClone');

        // test user event binding cloning on children
        assert.equal(taps.length, 0);
        group.find('.myRect')[0].fire('tap');
        assert.equal(taps.toString(), 'group rect');
        clone.find('.myRect')[0].fire('tap');
        assert.equal(taps.toString(), 'group rect,clone rect');

        stage.draw();

    });

    // ======================================================
    test('test on attr change', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 50,
            y: 50,
            width: 200,
            height: 50,
            fill: 'blue',
            shadowOffset: {x: 10, y: 10},
        });

        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 35,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        layer.add(circle);
        layer.add(rect);
        stage.add(layer);

        var widthChanged = 0;
        var shadowChanged = 0;
        var radiusChanged = 0;

        rect.on('widthChange', function(evt) {
            widthChanged++;
            assert.equal(evt.oldVal, 200);
            assert.equal(evt.newVal, 210);
        });

        rect.on('shadowOffsetChange', function() {
            shadowChanged++;
        });

        circle.on('radiusChange', function() {
            radiusChanged++;
        });

        circle.setRadius(70);

        rect.setSize({width: 210, height: 210});
        rect.setShadowOffset({
            x: 20
        });

        assert.equal(widthChanged, 1);
        assert.equal(shadowChanged, 1);
        assert.equal(radiusChanged, 1);

    });

    // ======================================================
    test('set shape, layer and stage opacity to 0.5', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        circle.setOpacity(0.5);
        layer.setOpacity(0.5);
        stage.setOpacity(0.5);
        layer.add(circle);
        stage.add(layer);

        assert.equal(circle.getAbsoluteOpacity(), 0.125);
        assert.equal(layer.getAbsoluteOpacity(), 0.25);
        assert.equal(stage.getAbsoluteOpacity(), 0.5);
    });

    // ======================================================
    test('hide show layer', function() {
        var stage = addStage();

        var layer1 = new Kinetic.Layer();
        var layer2 = new Kinetic.Layer();

        var circle1 = new Kinetic.Circle({
            x: 100,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });
        var circle2 = new Kinetic.Circle({
            x: 150,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
        });

        circle1.on('mousemove', function() {
            console.log('mousemove circle1');
        });

        circle2.on('mousemove', function() {
            console.log('mousemove circle2');
        });

        layer1.add(circle1);
        layer2.add(circle2);
        stage.add(layer1).add(layer2);


        assert.equal(layer2.isVisible(), true);
        layer2.hide();
        assert.equal(layer2.isVisible(), false);
        assert.equal(layer2.canvas._canvas.style.display, 'none');

        layer2.show();
        assert.equal(layer2.isVisible(), true);
        assert.equal(layer2.canvas._canvas.style.display, 'block');

    });

    // ======================================================
    test('rotation in degrees', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            rotationDeg: 10
        });

        assert.equal(rect.getRotationDeg(), 10);
        rect.setRotationDeg(20);
        assert.equal(rect.getRotationDeg(), 20);
        rect.rotateDeg(20);
        assert.equal(rect.getRotationDeg(), 40);

        layer.add(rect);
        stage.add(layer);
    });

    // ======================================================
    test('skew', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            skewX: 1
        });


        layer.add(rect);
        stage.add(layer);

        assert.equal(rect.getSkewX(), 1);
        assert.equal(rect.getSkewY(), 0);

        /*
        rect.transitionTo({
            duration: 4,
            skewY: -2,
            easing: 'ease-in-out'


        })
        */
    });

    // ======================================================
    test('init with position, scale, rotation, then change scale', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            scale: {
                x: 0.5,
                y: 0.5
            },
            rotation: 20 * Math.PI / 180
        });

        assert.equal(rect.getPosition().x, 200);
        assert.equal(rect.getPosition().y, 100);
        assert.equal(rect.getScale().x, 0.5);
        assert.equal(rect.getScale().y, 0.5);
        assert.equal(rect.getRotation(), 20 * Math.PI / 180);

        rect.setScale({x:2, y:0.3});
        assert.equal(rect.getScale().x, 2);
        assert.equal(rect.getScale().y, 0.3);

        layer.add(rect);
        stage.add(layer);
    });

    // ======================================================
    test('clone sprite', function(done) {
        var imageObj = new Image();
        imageObj.onload = function() {
            var stage = addStage();
            var layer = new Kinetic.Layer();

            var anims = {
                standing: [{
                    x: 0,
                    y: 0,
                    width: 49,
                    height: 109
                }, {
                    x: 52,
                    y: 0,
                    width: 49,
                    height: 109
                }, {
                    x: 105,
                    y: 0,
                    width: 49,
                    height: 109
                }, {
                    x: 158,
                    y: 0,
                    width: 49,
                    height: 109
                }, {
                    x: 210,
                    y: 0,
                    width: 49,
                    height: 109
                }, {
                    x: 262,
                    y: 0,
                    width: 49,
                    height: 109
                }],

                kicking: [{
                    x: 0,
                    y: 109,
                    width: 45,
                    height: 98
                }, {
                    x: 45,
                    y: 109,
                    width: 45,
                    height: 98
                }, {
                    x: 95,
                    y: 109,
                    width: 63,
                    height: 98
                }, {
                    x: 156,
                    y: 109,
                    width: 70,
                    height: 98
                }, {
                    x: 229,
                    y: 109,
                    width: 60,
                    height: 98
                }, {
                    x: 287,
                    y: 109,
                    width: 41,
                    height: 98
                }]
            };

            //for(var n = 0; n < 50; n++) {
            sprite = new Kinetic.Sprite({
                //x: Math.random() * stage.getWidth() - 30,
                x: 200,
                //y: Math.random() * stage.getHeight() - 50,
                y: 50,
                image: imageObj,
                animation: 'standing',
                animations: anims,
                index: 0,
                frameRate: Math.random() * 6 + 6,
                frameRate: 10,
                draggable: true,
                shadowColor: 'black',
                shadowBlur: 3,
                shadowOffset: [3, 1],
                shadowOpacity: 0.3
            });

            var clone = sprite.clone();
            layer.add(clone);
            stage.add(layer);
            clone.start();

            done();
        };
        imageObj.src = 'assets/scorpion-sprite.png';
    });

    // ======================================================
    test('node caching', function(done) {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();

        var points = [{
            x: 73,
            y: 250
        }, {
            x: 73,
            y: 160
        }, {
            x: 340,
            y: 23
        }, {
            x: 500,
            y: 109
        }, {
            x: 499,
            y: 139
        }, {
            x: 342,
            y: 93
        }];

        var poly = new Kinetic.Line({
            points: points,
            fill: 'green',
            stroke: 'blue',
            strokeWidth: 5,
            draggable: true,
            closed: true
        });

        group.add(poly);
        layer.add(group);
        stage.add(layer);

        poly.toImage({
            width: 500,
            height: 300,
            callback: function(imageObj) {
                //document.body.appendChild(imageObj)
                assert.equal(Kinetic.Util._isElement(imageObj), true);

                var cachedShape = new Kinetic.Image({
                    image: imageObj,
                    draggable: true,
                    stroke: 'red',
                    strokeWidth: 5,
                    x: 50,
                    y: -120

                });

                layer.add(cachedShape);
                layer.draw();
                done();
            }
        });

        showHit(layer);
    });

    // ======================================================
    test('node caching width minimal configuration', function(done) {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        stage.add(layer);

        var rect = new Kinetic.Rect({
            width : 50,
            height : 50,
            fill: 'green',
            stroke: 'blue',
            strokeWidth: 5,
            draggable: true
        });

        rect.toImage({
            callback: function(imageObj) {
                assert.equal(Kinetic.Util._isElement(imageObj), true);
                var cachedShape = new Kinetic.Image({
                    image: imageObj,
                    draggable: true,
                    stroke: 'red',
                    strokeWidth: 5
                });

                layer.add(cachedShape);
                layer.draw();
                done();
            }
        });

        showHit(layer);
    });
    // ======================================================
    test('hide group', function() {
        var stage = addStage();

        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();

        var circle1 = new Kinetic.Circle({
            x: 100,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });
        var circle2 = new Kinetic.Circle({
            x: 150,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
        });

        circle1.on('mousemove', function() {
            console.log('mousemove circle1');
        });

        circle2.on('mousemove', function() {
            console.log('mousemove circle2');
        });

        group.add(circle2);
        layer.add(circle1).add(group);
        stage.add(layer);

        assert.equal(group.isVisible(), true);
        assert.equal(circle2.isVisible(), true);

        group.hide();
        layer.draw();

        assert.equal(!group.isVisible(), true);
        assert.equal(!circle2.isVisible(), true);
    });

    // ======================================================
    test('add shape with custom attr pointing to self', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            offset: {
                x: 0,
                y: 0
            },
            scale: {
                x: 2,
                y: 2
            }
        });
        layer.add(circle);
        stage.add(layer);

        /*
         * add custom attr that points to self.  The setAttrs method should
         * not inifinitely recurse causing a stack overflow
         */
        circle.setAttrs({
            self: circle
        });

        /*
         * serialize the stage.  The json should succeed because objects that have
         * methods, such as self, are not serialized, and will therefore avoid
         * circular json errors.
         */
        var json = stage.toJSON();
    });

    // ======================================================
    test('scale shape by half', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        circle.setScale(0.5, 1);
        layer.add(circle);
        stage.add(layer);
    });

    // ======================================================
    test('scale shape by half then back to 1', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        circle.setScale(0.5, 1);
        circle.setScale(1, 1);
        layer.add(circle);
        stage.add(layer);
    });

    // ======================================================
    test('set center offset after instantiation', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 100,
            height: 50,
            stroke: 'blue',
            offset: {
                x: 40,
                y: 20
            }
        });

        layer.add(rect);
        stage.add(layer);

        assert.equal(rect.getOffsetX(), 40);
        assert.equal(rect.getOffsetY(), 20);

        assert.equal(rect.getOffset().x, 40);
        assert.equal(rect.getOffset().y, 20);

        rect.setOffset({x:80, y:40});

        assert.equal(rect.getOffsetX(), 80);
        assert.equal(rect.getOffsetY(), 40);

        assert.equal(rect.getOffset().x, 80);
        assert.equal(rect.getOffset().y, 40);

    });

    // ======================================================
    test('rotation in degrees', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            rotationDeg: 10
        });

        assert.equal(rect.getRotationDeg(), 10);
        rect.setRotationDeg(20);
        assert.equal(rect.getRotationDeg(), 20);
        rect.rotateDeg(20);
        assert.equal(rect.getRotationDeg(), 40);

        layer.add(rect);
        stage.add(layer);
    });

    // ======================================================
    test('get shape name', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myCircle'
        });

        layer.add(circle);
        stage.add(layer);

        assert.equal(circle.getName(),'myCircle');
    });

    // ======================================================
    test('test setting shadow offset', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: 100,
            height: 50,
            fill: 'red',
            shadowColor: 'blue',
            shadowBlur: 12
        });

        layer.add(rect);
        stage.add(layer);

        rect.setShadowOffset({x:1, y:2});
        assert.equal(rect.getShadowOffset().x, 1);
        assert.equal(rect.getShadowOffset().y, 2);
        // make sure we still have the other properties
        assert.equal(rect.getShadowColor(), 'blue');
        assert.equal(rect.getShadowBlur(), 12);

        rect.setShadowOffset({
            x: 3,
            y: 4
        });
        assert.equal(rect.getShadowOffset().x, 3);
        assert.equal(rect.getShadowOffset().y, 4);

        // test partial setting
        rect.setShadowOffsetX(5);
        assert.equal(rect.getShadowOffset().x, 5);
        assert.equal(rect.getShadowOffset().y, 4);

        // test partial setting
        rect.setShadowOffsetY(6);
        assert.equal(rect.getShadowOffset().x, 5);
        assert.equal(rect.getShadowOffset().y, 6);

    });

    // ======================================================
    test('test setOffset', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: 100,
            height: 50,
            fill: 'red'
        });

        layer.add(rect);
        stage.add(layer);

        rect.setOffset({x:1, y: 2});
        assert.equal(rect.getOffset().x, 1);
        assert.equal(rect.getOffset().y, 2);

        rect.setOffset({x:3, y:4});
        assert.equal(rect.getOffset().x, 3);
        assert.equal(rect.getOffset().y, 4);

        rect.setOffset({
            x: 5,
            y: 6
        });
        assert.equal(rect.getOffset().x, 5);
        assert.equal(rect.getOffset().y, 6);

        rect.setOffsetX(7);
        assert.equal(rect.getOffset().x, 7);
        assert.equal(rect.getOffset().y, 6);

        rect.setOffsetY(8);
        assert.equal(rect.getOffset().x, 7);
        assert.equal(rect.getOffset().y, 8);

    });

    // ======================================================
    test('test setPosition and move', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: 100,
            height: 50,
            fill: 'red'
        });

        layer.add(rect);
        stage.add(layer);

        rect.setPosition({x:1, y:2});
        assert.equal(rect.getPosition().x, 1);
        assert.equal(rect.getPosition().y, 2);

        rect.setPosition({x:3, y:4});
        assert.equal(rect.getPosition().x, 3);
        assert.equal(rect.getPosition().y, 4);

        rect.setPosition({
            x: 5,
            y: 6
        });
        assert.equal(rect.getPosition().x, 5);
        assert.equal(rect.getPosition().y, 6);

        rect.setX(7);
        assert.equal(rect.getPosition().x, 7);
        assert.equal(rect.getPosition().y, 6);

        rect.setY(8);
        assert.equal(rect.getPosition().x, 7);
        assert.equal(rect.getPosition().y, 8);

        rect.move({x: 10, y: 10});
        assert.equal(rect.getPosition().x, 17);
        assert.equal(rect.getPosition().y, 18);

    });

    // ======================================================
    test('test setScale', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 200,
            y: 20,
            width: 100,
            height: 50,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
        });

        layer.add(rect);
        stage.add(layer);

        rect.setScale({x:2, y:3});
        assert.equal(rect.getScale().x, 2);
        assert.equal(rect.getScale().y, 3);

        rect.setScale({x:4,y:4});
        assert.equal(rect.getScale().x, 4);
        assert.equal(rect.getScale().y, 4);

        rect.setScale({x:5, y:6});
        assert.equal(rect.getScale().x, 5);
        assert.equal(rect.getScale().y, 6);

        rect.setScale({x: 7, y:8});
        assert.equal(rect.getScale().x, 7);
        assert.equal(rect.getScale().y, 8);

        rect.setScale({
            x: 9,
            y: 10
        });
        assert.equal(rect.getScale().x, 9);
        assert.equal(rect.getScale().y, 10);

        rect.setScaleX(11);
        assert.equal(rect.getScale().x, 11);
        assert.equal(rect.getScale().y, 10);

        rect.setScaleY(12);
        assert.equal(rect.getScale().x, 11);
        assert.equal(rect.getScale().y, 12);

    });

    // ======================================================
    test('test config scale', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var rect1 = new Kinetic.Rect({
            x: 200,
            y: 20,
            width: 100,
            height: 50,
            fill: 'red',
            scale: {
                x: 2,
                y: 3
            }
        });

        var rect2 = new Kinetic.Rect({
            x: 200,
            y: 20,
            width: 100,
            height: 50,
            fill: 'red',
            scale: {x:2,y:2}
        });

        var rect3 = new Kinetic.Rect({
            x: 200,
            y: 20,
            width: 100,
            height: 50,
            fill: 'red',
            scale: {x:2, y:3}
        });

        var rect4 = new Kinetic.Rect({
            x: 200,
            y: 20,
            width: 100,
            height: 50,
            fill: 'red',
            scaleX: 2
        });

        var rect5 = new Kinetic.Rect({
            x: 200,
            y: 20,
            width: 100,
            height: 50,
            fill: 'red',
            scaleY: 2
        });

        layer.add(rect1).add(rect2).add(rect3).add(rect4).add(rect5);
        stage.add(layer);

        assert.equal(rect1.getScale().x, 2);
        assert.equal(rect1.getScale().y, 3);

        assert.equal(rect2.getScale().x, 2);
        assert.equal(rect2.getScale().y, 2);

        assert.equal(rect3.getScale().x, 2);
        assert.equal(rect3.getScale().y, 3);

        assert.equal(rect4.getScale().x, 2);
        assert.equal(rect4.getScale().y, 1);

        //assert.equal(rect5.getScale().x, 1);
        assert.equal(rect5.getScale().y, 2);
    });

    // ======================================================
    test('test config position', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var rect1 = new Kinetic.Rect({
            x: 1,
            y: 2,
            width: 100,
            height: 50,
            fill: 'red'
        });

        var rect2 = new Kinetic.Rect({
            x: 3,
            width: 100,
            height: 50,
            fill: 'red'
        });

        var rect3 = new Kinetic.Rect({
            y: 4,
            width: 100,
            height: 50,
            fill: 'red'
        });

        var rect4 = new Kinetic.Rect({
            width: 100,
            height: 50,
            fill: 'red'
        });

        layer.add(rect1).add(rect2).add(rect3).add(rect4);
        stage.add(layer);

        assert.equal(rect1.getPosition().x, 1);
        assert.equal(rect1.getPosition().y, 2);

        assert.equal(rect2.getPosition().x, 3);
        assert.equal(rect2.getPosition().y, 0);

        assert.equal(rect3.getPosition().x, 0);
        assert.equal(rect3.getPosition().y, 4);

        assert.equal(rect4.getPosition().x, 0);
        assert.equal(rect4.getPosition().y, 0);
    });

    // ======================================================
    test('test getPosition and getAbsolutePosition for shape inside transformed stage', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 200,
            y: 20,
            width: 100,
            height: 50,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true
            //rotationDeg: 60
            //rotationDeg: Math.PI / 3
        });

        layer.add(rect);
        stage.add(layer);

        //stage.rotateDeg(20);

        //console.log(rect.getAbsoluteTransform().getTranslation())

        stage.rotate(Math.PI / 3);
        stage.setScale({x:0.5, y:0.5});

        stage.draw();

        assert.equal(rect.getPosition().x, 200);
        assert.equal(rect.getPosition().y, 20);

        assert.equal(Math.round(rect.getAbsolutePosition().x), 41);
        assert.equal(Math.round(rect.getAbsolutePosition().y), 92);
    });

    // ======================================================
    test('test consecutive getAbsolutePositions()s when shape has offset', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 200,
            y: 20,
            width: 100,
            height: 50,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            offset: 30
            //rotationDeg: 60
            //rotationDeg: Math.PI / 3
        });

        layer.add(rect);
        stage.add(layer);


        assert(rect.getAbsolutePosition().x === 200 && rect.getAbsolutePosition().y === 20, 'absolute position should be 200, 20');
        assert(rect.getAbsolutePosition().x === 200 && rect.getAbsolutePosition().y === 20, 'absolute position should be 200, 20');
        assert(rect.getAbsolutePosition().x === 200 && rect.getAbsolutePosition().y === 20, 'absolute position should be 200, 20');
        assert(rect.getAbsolutePosition().x === 200 && rect.getAbsolutePosition().y === 20, 'absolute position should be 200, 20');
        assert(rect.getAbsolutePosition().x === 200 && rect.getAbsolutePosition().y === 20, 'absolute position should be 200, 20');
    });

    // ======================================================
    test('test getPosition and getAbsolutePosition for transformed parent with center offset', function() {
        var side = 100;
        var diagonal = Math.sqrt(side * side * 2);

        var stage = addStage();
        var layer = new Kinetic.Layer({
            name: 'layerName',
            id: 'layerId'
        });
        var group = new Kinetic.Group({
            name: 'groupName',
            id: 'groupId',
            rotationDeg: 45,
            offset: {x:side / 2, y:side / 2},
            x: diagonal / 2,
            y: diagonal / 2
        });
        var rect = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: side,
            height: side,
            fill: 'red',
            name: 'rectName',
            id: 'rectId'
        });
        var marker = new Kinetic.Rect({
            x: side,
            y: 0,
            width: 1,
            height: 1,
            fill: 'blue',
            stroke: 'blue',
            strokeWidth: 4,
            name: 'markerName',
            id: 'markerId'
        });

        group.add(rect);
        group.add(marker);
        layer.add(group);
        stage.add(layer);

        assert.equal(Math.round(marker.getAbsolutePosition().x), Math.round(diagonal), 'marker absolute position x should be about ' + Math.round(diagonal) + ' but is about ' + Math.round(marker.getAbsolutePosition().x));
        assert.equal(Math.round(marker.getAbsolutePosition().y), Math.round(diagonal / 2), 'marker absolute position y should be about ' + Math.round(diagonal / 2) + ' but is about ' + Math.round(marker.getAbsolutePosition().y));
    });

    // ======================================================
    test('translate, rotate, scale shape', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Rect({
            x: 100,
            y: 100,
            rotationDeg: 20,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            scale: {
                x: 2,
                y: 1
            },
            offset: {
                x: 50,
                y: 25
            }
        });

        layer.add(circle);
        stage.add(layer);
    });

    // ======================================================
    test('test isListening', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 100,
            y: 100,
            rotationDeg: 20,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        layer.add(rect);
        stage.add(layer);

        assert.equal(rect.isListening(), true);

        rect.setListening(false);
        assert.equal(rect.isListening(), false);

        rect.setListening('inherit');
        assert.equal(rect.isListening(), true);

        layer.setListening(false);

        assert.equal(rect.isListening(), false);

        layer.setListening(true);
        assert.equal(rect.isListening(), true);

        // even though we set stage listening to false, since the layer
        // listening is set to try, rect listening will be true
        stage.setListening(false);
        assert.equal(rect.isListening(), true);

        // setting layer listening to inherit means that the layer listening
        // will inherit the stage listening, which is false
        layer.setListening('inherit');
        assert.equal(rect.isListening(), false);

    });

    // ======================================================
    test('test fire event', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myCircle'
        });

        stage.add(layer);
        layer.add(circle);
        layer.draw();

        var clicks = [];

        circle.on('click', function() {
            clicks.push('circle');

            /*
             var evt = window.event;
             var rightClick = evt.which ? evt.which == 3 : evt.button == 2;
             console.log(rightClick);
             */
        });
        var foo;
        circle.on('customEvent', function(evt) {
            foo = evt.foo;
        });

        layer.on('click', function() {
            clicks.push('layer');
        });
        // fire event with bubbling
        circle.fire('click', null, true);

        //console.log(clicks);

        assert.equal(clicks.toString(),'circle,layer');

        // no bubble
        circle.fire('click');

        assert.equal(clicks.toString(), 'circle,layer,circle');

        // test custom event
        circle.fire('customEvent', {
            foo: 'bar'
        });

        assert.equal(foo, 'bar');

        // test fireing custom event that doesn't exist.  script should not fail
        circle.fire('kaboom');

    });

    // ======================================================
    test('add remove event', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myCircle'
        });

        /*
         * test regular on and off
         */
        assert.equal(circle.eventListeners['click'], undefined);

        circle.on('click', function() {
        });
        assert.equal(circle.eventListeners['click'].length, 1);

        circle.on('click', function() {
        });
        assert.equal(circle.eventListeners['click'].length, 2);

        circle.off('click');
        assert.equal(circle.eventListeners['click'], undefined);

        /*
         * test name spacing
         */
        circle.on('click.foo', function() {
        });
        assert.equal(circle.eventListeners['click'].length, 1);

        circle.on('click.foo', function() {
        });
        assert.equal(circle.eventListeners['click'].length, 2);
        circle.on('click.bar', function() {
        });
        assert.equal(circle.eventListeners['click'].length, 3);

        circle.off('click.foo');
        assert.equal(circle.eventListeners['click'].length, 1);

        circle.off('click.bar');
        assert.equal(circle.eventListeners['click'], undefined);

        /*
         * test remove all events in name space
         */
        circle.on('click.foo', function() {
        });
        circle.on('click.foo', function() {
        });
        circle.on('touch.foo', function() {
        });
        circle.on('click.bar', function() {
        });
        circle.on('touch.bar', function() {
        });
        assert.equal(circle.eventListeners['click'].length, 3);
        assert.equal(circle.eventListeners['touch'].length, 2);
        circle.off('.foo');
        assert.equal(circle.eventListeners['click'].length, 1);
        assert.equal(circle.eventListeners['touch'].length, 1);

        circle.off('.bar');
        assert.equal(circle.eventListeners['click'], undefined);
        assert.equal(circle.eventListeners['touch'], undefined);

        stage.add(layer);
        layer.add(circle);
        layer.draw();
    });

    // ======================================================
    test('simulate event bubble', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myCircle'
        });

        stage.add(layer);
        layer.add(circle);
        layer.draw();

        var clicks = [];

        circle.on('click', function() {
            clicks.push('circle');
        });

        layer.on('click', function() {
            clicks.push('layer');
        });

        circle.fire('click', null, true);

        assert.equal(clicks[0], 'circle');
        assert.equal(clicks[1], 'layer');
    });

    // ======================================================
    test('move shape, group, and layer, and then get absolute position', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();

        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        group.add(circle);
        layer.add(group);
        stage.add(layer);

        circle.setPosition({x:100, y:0});
        group.setPosition({x: 100, y: 0});
        layer.setPosition({x: 100, y: 0});

        // test relative positions
        assert.equal(circle.getPosition().x, 100);
        assert.equal(group.getPosition().x, 100);
        assert.equal(layer.getPosition().x, 100);

        // test absolute positions
        assert.equal(circle.getAbsolutePosition().x, 300);
        assert.equal(group.getAbsolutePosition().x, 200);
        assert.equal(layer.getAbsolutePosition().x, 100);

        layer.draw();
    });

    // ======================================================
    test('scale layer, rotate group, position shape, and then get absolute position', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer({
            scale: {
                x: 2,
                y: 2
            }
        });
        var group = new Kinetic.Group({
            x: 100,
            rotationDeg: 90
        });

        var rect = new Kinetic.Rect({
            x: 50,
            y: 10,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true
        });

        group.add(rect);
        layer.add(group);
        stage.add(layer);

        // test absolute positions
        assert.equal(rect.getAbsolutePosition().x, 180);
        assert.equal(rect.getAbsolutePosition().y, 100);

        layer.draw();
    });

    // ======================================================
    test('hide show circle', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        layer.add(circle);
        stage.add(layer);

        assert.equal(circle.isVisible(), true);

        circle.hide();
        layer.draw();

        assert.equal(circle.isVisible(), false);

        circle.show();
        layer.draw();

        assert.equal(circle.isVisible(), true);
    });

    // ======================================================
    test('set shape opacity to 0.5', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 20,
            draggable: true
        });

        circle.setOpacity(0.5);
        layer.add(circle);
        stage.add(layer);

        var sceneTrace = layer.getContext().getTrace();
        //console.log(sceneTrace);

        var bufferTrace = stage.bufferCanvas.getContext().getTrace();
        //console.log(bufferTrace);

        assert.equal(sceneTrace, 'clearRect(0,0,578,200);save();globalAlpha=0.5;drawImage([object HTMLCanvasElement],0,0);restore();');
        assert.equal(bufferTrace, 'clearRect(0,0,578,200);save();transform(1,0,0,1,289,100);beginPath();arc(0,0,70,0,6.283,false);closePath();fillStyle=green;fill();lineWidth=20;strokeStyle=black;stroke();restore();');
    });

    // ======================================================
    test('set shape opacity to 0.5 then back to 1', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        circle.setOpacity(0.5);
        layer.add(circle);
        stage.add(layer);

        assert.equal(circle.getAbsoluteOpacity(), 0.5);

        circle.setOpacity(1);
        layer.draw();

        assert.equal(circle.getAbsoluteOpacity(), 1);
    });

    // ======================================================
    test('get absolute z index', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var group1 = new Kinetic.Group();
        var group2 = new Kinetic.Group();
        var group3 = new Kinetic.Group();
        var group4 = new Kinetic.Group();

        var shape1 = new Kinetic.Circle({
            x: 150,
            y: stage.getHeight() / 2,
            radius: 40,
            fill: 'green'
        });

        var shape2 = new Kinetic.Circle({
            x: 250,
            y: stage.getHeight() / 2,
            radius: 40,
            fill: 'green'
        });

        /*
         *        Stage(0)
         *          |
         *        Layer(1)
         *          |
         *    +-----+-----+
         *    |           |
         *   G1(2)       G2(3)
         *    |           |
         *    +       +---+---+
         *    |       |       |
         *   S1(4)   G3(5)  G4(6)
         *            |
         *            +
         *            |
         *           S2(7)
         */

        group1.add(shape1);
        group2.add(group3);
        group2.add(group4);
        group3.add(shape2);
        layer.add(group1);
        layer.add(group2);
        stage.add(layer);

        assert.equal(stage.getAbsoluteZIndex(), 0);
        //console.log(layer.getAbsoluteZIndex());
        assert.equal(layer.getAbsoluteZIndex(), 1);
        assert.equal(group1.getAbsoluteZIndex(), 2);
        assert.equal(group2.getAbsoluteZIndex(), 3);
        assert.equal(shape1.getAbsoluteZIndex(), 4);
        assert.equal(group3.getAbsoluteZIndex(), 5);
        assert.equal(group4.getAbsoluteZIndex(), 6);
        assert.equal(shape2.getAbsoluteZIndex(), 7);
    });

    // ======================================================
    test('JPEG toDataURL() Not Hiding Lower Layers with Black', function(done) {
        var stage = addStage();

        var layer1 = new Kinetic.Layer();
        var layer2 = new Kinetic.Layer();

        layer1.add(new Kinetic.Rect({
            x: 10,
            y: 10,
            width: 25,
            height: 15,
            fill: 'red'
        }));
        layer2.add(new Kinetic.Rect({
            x: 50,
            y: 50,
            width: 15,
            height: 25,
            fill: 'green'
        }));

        stage.add(layer1);
        stage.add(layer2);

        stage.toDataURL({
            height: 100,
            width: 100,
            mimeType: 'image/jpeg',
            quality: 0.8,
            callback: function(url) {
                var imageObj = new Image();
                imageObj.onload = function() {
                    layer2.add(new Kinetic.Image({
                        x: 200,
                        y: 10,
                        image: imageObj
                    }));
                    layer2.draw();
                    done();
                };
                imageObj.src = url;
            }
        })
    });

    // ======================================================
    test('serialize stage', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myCircle',
            draggable: true
        });

        stage.add(layer);
        layer.add(group);
        group.add(circle);
        layer.draw();

        var expectedJson = '{"attrs":{"width":578,"height":200},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{},"className":"Group","children":[{"attrs":{"x":289,"y":100,"radius":70,"fill":"green","stroke":"black","strokeWidth":4,"name":"myCircle","draggable":true},"className":"Circle"}]}]}]}';

        assert.equal(stage.toJSON(), expectedJson);
    });

    // ======================================================
    test('serialize shape', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myCircle',
            draggable: true
        });

        stage.add(layer);
        layer.add(group);
        group.add(circle);
        layer.draw();

        var expectedJson = '{"attrs":{"x":289,"y":100,"radius":70,"fill":"green","stroke":"black","strokeWidth":4,"name":"myCircle","draggable":true},"className":"Circle"}';


        assert.equal(circle.toJSON(), expectedJson);
    });

    // ======================================================
    test('load stage using json', function() {
        var container = addContainer();
        var json = '{"attrs":{"width":578,"height":200},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{},"className":"Group","children":[{"attrs":{"x":289,"y":100,"radius":70,"fill":"green","stroke":"black","strokeWidth":4,"name":"myCircle","draggable":true},"className":"Shape"}]}]}]}';
        var stage = Kinetic.Node.create(json, container);

        assert.equal(stage.toJSON(), json);
    });

    // ======================================================
    test('serialize stage with custom shape', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();

        var drawTriangle = function(context) {
            context.beginPath();
            context.moveTo(200, 50);
            context.lineTo(420, 80);
            context.quadraticCurveTo(300, 100, 260, 170);
            context.closePath();
            context.fillStrokeShape(this);
        };
        var triangle = new Kinetic.Shape({
            drawFunc: drawTriangle,
            fill: "#00D2FF",
            stroke: "black",
            strokeWidth: 4,
            id: 'myTriangle'
        });

        group.add(triangle);
        layer.add(group);
        stage.add(layer);

        assert.equal(triangle.getId(), 'myTriangle');

        var expectedJson = '{"attrs":{"width":578,"height":200},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{},"className":"Group","children":[{"attrs":{"fill":"#00D2FF","stroke":"black","strokeWidth":4,"id":"myTriangle"},"className":"Shape"}]}]}]}';


        assert.equal(stage.toJSON(), expectedJson);

        layer.draw();

    });

    // ======================================================
    test('load stage with custom shape using json', function() {
        var container = addContainer();

        var drawTriangle = function(context) {
            context.beginPath();
            context.moveTo(200, 50);
            context.lineTo(420, 80);
            context.quadraticCurveTo(300, 100, 260, 170);
            context.closePath();
            context.fillStrokeShape(this);
        };
        var json = '{"attrs":{"width":578,"height":200},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{},"className":"Group","children":[{"attrs":{"fill":"#00D2FF","stroke":"black","strokeWidth":4,"id":"myTriangle"},"className":"Shape"}]}]}]}';

        var stage = Kinetic.Node.create(json, container);

        stage.find('#myTriangle').each(function(node) {
            node.setDrawFunc(drawTriangle);
        });

        stage.draw();

        assert.equal(stage.toJSON(), json);
    });

    // ======================================================
    test('serialize stage with an image', function(done) {
        var imageObj = new Image();
        imageObj.onload = function() {
            var stage = addStage();
            var layer = new Kinetic.Layer();
            darth = new Kinetic.Image({
                x: 200,
                y: 60,
                image: imageObj,
                offset: {
                    x: 50,
                    y: imageObj.height / 2
                },
                id: 'darth'
            });

            layer.add(darth);
            stage.add(layer);
            var json = '{"attrs":{"width":578,"height":200},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{"x":200,"y":60,"offsetX":50,"offsetY":150,"id":"darth"},"className":"Image"}]}]}';

            assert.equal(stage.toJSON(), json);

            done();
        };
        imageObj.src = 'assets/darth-vader.jpg';
    });

    // ======================================================
    test('load stage with an image', function(done) {
        var imageObj = new Image();
        var container = addContainer();
        imageObj.onload = function() {
            var json = '{"attrs":{"width":578,"height":200},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{"x":200,"y":60,"offsetX":50,"offsetY":150,"id":"darth"},"className":"Image"}]}]}';
            var stage = Kinetic.Node.create(json, container);

            assert.equal(stage.toJSON(), json);
            stage.find('#darth').each(function(node) {
                node.setImage(imageObj);
            });
            stage.draw();

            done();
        };
        imageObj.src = 'assets/darth-vader.jpg';
    });

    // ======================================================
    test('remove shape', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myCircle'
        });

        layer.add(circle);
        stage.add(layer);

        assert.equal(layer.children.length, 1);

        circle.remove();

        assert.equal(layer.children.length, 0);

        layer.draw();

        assert.equal(circle.getParent(), undefined);
    });

    // ======================================================
    test('destroy shape', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myCircle'
        });

        layer.add(circle);
        stage.add(layer);

        assert.equal(layer.children.length, 1);

        circle.destroy();

        assert.equal(layer.children.length, 0);

        layer.draw();

        assert.equal(circle.getParent(), undefined);
    });

    // ======================================================
    test('destroy shape without adding its parent to stage', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            id: 'myCircle'
        });

        layer.add(circle);

        var node = stage.find('#myCircle')[0];

        assert.equal(node, undefined);

        circle.destroy();

    });

    // ======================================================
    test('destroy layer with shape', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer({
            name: 'myLayer'
        });
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myCircle'
        });

        layer.add(circle);
        stage.add(layer);

        assert.equal(stage.children.length, 1);
        assert(stage.find('.myLayer')[0] !== undefined);
        assert(stage.find('.myCircle')[0] !== undefined);

        layer.destroy();

        assert.equal(stage.children.length, 0);
        assert.equal(stage.find('.myLayer')[0], undefined);
        assert.equal(stage.find('.myCircle')[0], undefined);

        stage.draw();
    });

    // ======================================================
    test('destroy stage with layer and shape', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer({
            name: 'myLayer'
        });
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myCircle'
        });

        layer.add(circle);
        stage.add(layer);

        stage.destroy();

        assert.equal(layer.getParent(), undefined);
        assert.equal(circle.getParent(), undefined);
        assert.equal(stage.children.length, 0);
        assert.equal(layer.children.length, 0);
    });

    // ======================================================
    test('destroy group with shape', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer({
            name: 'myLayer'
        });
        var group = new Kinetic.Group({
            name: 'myGroup'
        });

        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myCircle'
        });

        group.add(circle);
        layer.add(group);
        stage.add(layer);

        assert.equal(layer.getChildren().length, 1);
        assert(stage.find('.myGroup')[0] !== undefined);
        assert(stage.find('.myCircle')[0] !== undefined);

        group.destroy();

        assert.equal(layer.children.length, 0);
        assert.equal(stage.find('.myGroup')[0], undefined);
        assert.equal(stage.find('.myCircle')[0], undefined);

        stage.draw();
    });

    // ======================================================
    test('destroy layer with no shapes', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        stage.add(layer);
        layer.destroy();

        assert.equal(stage.children.length, 0);
    });

    // ======================================================
    test('destroy shape multiple times', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var shape1 = new Kinetic.Circle({
            x: 150,
            y: 100,
            radius: 50,
            fill: 'green',
            name: 'myCircle'
        });

        var shape2 = new Kinetic.Circle({
            x: 250,
            y: 100,
            radius: 50,
            fill: 'green',
            name: 'myCircle'
        });

        layer.add(shape1);
        layer.add(shape2);
        stage.add(layer);

        assert.equal(layer.getChildren().length, 2);

        shape1.destroy();
        shape1.destroy();

        assert.equal(layer.getChildren().length, 1);

        layer.draw();

    });

    // ======================================================
    test('remove layer multiple times', function() {
        var stage = addStage();
        var layer1 = new Kinetic.Layer();
        var layer2 = new Kinetic.Layer();

        var shape1 = new Kinetic.Circle({
            x: 150,
            y: 100,
            radius: 50,
            fill: 'green',
            name: 'myCircle'
        });

        var shape2 = new Kinetic.Circle({
            x: 250,
            y: 100,
            radius: 50,
            fill: 'green',
            name: 'myCircle'
        });

        layer1.add(shape1);
        layer2.add(shape2);
        stage.add(layer1);
        stage.add(layer2);

        assert.equal(stage.getChildren().length, 2);

        layer1.remove();
        layer1.remove();

        assert.equal(stage.getChildren().length, 1);

        stage.draw();

    });

    // ======================================================
    test('destroy shape by id or name', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            id: 'myCircle2'
        });

        var rect = new Kinetic.Rect({
            x: 300,
            y: 100,
            width: 100,
            height: 50,
            fill: 'purple',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myRect2'
        });

        var circleColorKey = circle.colorKey;
        var rectColorKey = rect.colorKey;

        layer.add(circle);
        layer.add(rect);
        stage.add(layer);

        assert.equal(Kinetic.ids.myCircle2._id, circle._id);
        assert.equal(Kinetic.names.myRect2[0]._id, rect._id);
        assert.equal(Kinetic.shapes[circleColorKey]._id, circle._id);
        assert.equal(Kinetic.shapes[rectColorKey]._id, rect._id);

        circle.destroy();

        assert.equal(Kinetic.ids.myCircle2, undefined);
        assert.equal(Kinetic.names.myRect2[0]._id, rect._id);
        assert.equal(Kinetic.shapes[circleColorKey], undefined);
        assert.equal(Kinetic.shapes[rectColorKey]._id, rect._id);

        rect.destroy();

        assert.equal(Kinetic.ids.myCircle2, undefined);
        assert.equal(Kinetic.names.myRect2, undefined);
        assert.equal(Kinetic.shapes[circleColorKey], undefined);
        assert.equal(Kinetic.shapes[rectColorKey], undefined);
    });

    // ======================================================
    test('hide stage', function() {
        var stage = addStage();
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();

        var rect = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 100,
            height: 50,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            rotationDeg: 60,
            scale: {
                x: 2,
                y: 1
            }
        });

        group.add(rect);
        layer.add(group);
        stage.add(layer);

        stage.hide();
        stage.draw();

        // TODO: stage hide() fails.  also need to find a good way to test this

    });

  // ======================================================
  test('listening, & shouldDrawHit', function(){
    var stage = addStage();

    var layer = new Kinetic.Layer();

    var rect = new Kinetic.Rect({
      x: 100,
      y: 50,
      width: 100,
      height: 50,
      fill: 'green',
      stroke: 'blue'
    });

    layer.add(rect);
    stage.add(layer);



    assert.equal(rect.isListening(), true);
    assert.equal(rect.shouldDrawHit(), true);

    rect.setListening(false);


    assert.equal(rect.isListening(), false);
    assert.equal(rect.shouldDrawHit(), false);


  });

    // ======================================================
  test('transformEnabled methods', function(){
    var stage = addStage();
    var layer = new Kinetic.Layer();
    var group = new Kinetic.Group();
    var circle = new Kinetic.Circle({
        x: 100,
        y: 100,
        radius: 70,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 4,
        name: 'myCircle',
        draggable: true
    });

    group.add(circle);
    layer.add(group);
    stage.add(layer);

    assert.equal(circle.transformsEnabled(), 'all');

    circle.transformsEnabled('position');
    assert.equal(circle.transformsEnabled(), 'position');

    layer.draw();



  });

    // ======================================================
  test('transformEnabled context tracing', function(){
    var stage = addStage();

    stage.setX(100);

    var layer = new Kinetic.Layer({
        x: 100
    });
    var group = new Kinetic.Group({
        x: 100
    });
    var circle = new Kinetic.Circle({
        x: 100,
        y: 100,
        radius: 40,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 4,
        name: 'myCircle',
        draggable: true
    });

    group.add(circle);
    layer.add(group);
    stage.add(layer);
    assert.equal(layer.getContext().getTrace(), 'clearRect(0,0,578,200);save();transform(1,0,0,1,400,100);beginPath();arc(0,0,40,0,6.283,false);closePath();fillStyle=green;fill();lineWidth=4;strokeStyle=black;stroke();restore();');

    stage.transformsEnabled('none');
    layer.getContext().clearTrace();
    stage.draw();
    assert.equal(layer.getContext().getTrace(), 'clearRect(0,0,578,200);save();transform(1,0,0,1,300,100);beginPath();arc(0,0,40,0,6.283,false);closePath();fillStyle=green;fill();lineWidth=4;strokeStyle=black;stroke();restore();');

    layer.transformsEnabled('none');
    layer.getContext().clearTrace();
    stage.draw();
    assert.equal(layer.getContext().getTrace(), 'clearRect(0,0,578,200);save();transform(1,0,0,1,200,100);beginPath();arc(0,0,40,0,6.283,false);closePath();fillStyle=green;fill();lineWidth=4;strokeStyle=black;stroke();restore();');

    group.transformsEnabled('none');
    layer.getContext().clearTrace();
    stage.draw();
    assert.equal(layer.getContext().getTrace(), 'clearRect(0,0,578,200);save();transform(1,0,0,1,100,100);beginPath();arc(0,0,40,0,6.283,false);closePath();fillStyle=green;fill();lineWidth=4;strokeStyle=black;stroke();restore();');

    // disabling a shape transform disables all transforms but x and y.  In this case, the Kinetic.Context uses translate instead of transform
    circle.transformsEnabled('position');
    layer.getContext().clearTrace();
    stage.draw();
    assert.equal(layer.getContext().getTrace(), 'clearRect(0,0,578,200);save();translate(100,100);beginPath();arc(0,0,40,0,6.283,false);closePath();fillStyle=green;fill();lineWidth=4;strokeStyle=black;stroke();restore();');

    //console.log(layer.getContext().getTrace());

  });

    // ======================================================
  test('isVisible', function(){
    var stage = addStage();
    var layer = new Kinetic.Layer();
    var group = new Kinetic.Group();
    var circle = new Kinetic.Circle({
        x: 100,
        y: 100,
        radius: 70,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 4,
        name: 'myCircle',
        draggable: true
    });

    group.add(circle);
    layer.add(group);
    stage.add(layer);

    assert.equal(stage.isVisible(), true);
    assert.equal(layer.isVisible(), true);
    assert.equal(circle.isVisible(), true);

    stage.setVisible(false);

    assert.equal(stage.isVisible(), false);
    assert.equal(layer.isVisible(), false);
    assert.equal(circle.isVisible(), false);

    stage.setVisible('inherit');
    layer.setVisible(false);

    assert.equal(stage.isVisible(), true);
    assert.equal(layer.isVisible(), false);
    assert.equal(circle.isVisible(), false);

    layer.setVisible('inherit');
    circle.setVisible(false);

    assert.equal(stage.isVisible(), true);
    assert.equal(layer.isVisible(), true);
    assert.equal(circle.isVisible(), false);

    circle.setVisible('inherit');
    stage.setVisible(true);

    assert.equal(stage.isVisible(), true);
    assert.equal(layer.isVisible(), true);
    assert.equal(circle.isVisible(), true);

    stage.setVisible('inherit');
    layer.setVisible(true);

    assert.equal(stage.isVisible(), true);
    assert.equal(layer.isVisible(), true);
    assert.equal(circle.isVisible(), true);

    layer.setVisible('inherit');
    circle.setVisible(true);

    assert.equal(stage.isVisible(), true);
    assert.equal(layer.isVisible(), true);
    assert.equal(circle.isVisible(), true);

  });

  test('overloaders', function(){
    var stage = addStage();
    var layer = new Kinetic.Layer();
    var group = new Kinetic.Group();
    var circle = new Kinetic.Circle({
        x: 100,
        y: 100,
        radius: 70,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 4,
        name: 'myCircle',
        draggable: true
    });

    group.add(circle);
    layer.add(group);
    stage.add(layer);

    circle.x(1);
    assert.equal(circle.x(), 1);

    circle.y(2);
    assert.equal(circle.y(), 2);

    circle.opacity(0.5);
    assert.equal(circle.opacity(), 0.5);

    circle.name('foo');
    assert.equal(circle.name(), 'foo'); 

    circle.id('bar');
    assert.equal(circle.id(), 'bar'); 

    circle.rotation(2);
    assert.equal(circle.rotation(), 2);

    circle.rotationDeg(3);
    assert.equal(Math.round(circle.rotationDeg()), 3);

    circle.scale({x: 2, y: 2});
    assert.equal(circle.scale().x, 2);
    assert.equal(circle.scale().y, 2);

    circle.scaleX(5);
    assert.equal(circle.scaleX(), 5);

    circle.scaleY(8);
    assert.equal(circle.scaleY(), 8);

    circle.skew({x: 2, y: 2});
    assert.equal(circle.skew().x, 2);
    assert.equal(circle.skew().y, 2);

    circle.skewX(5);
    assert.equal(circle.skewX(), 5);

    circle.skewY(8);
    assert.equal(circle.skewY(), 8);

    circle.offset({x: 2, y: 2});
    assert.equal(circle.offset().x, 2);
    assert.equal(circle.offset().y, 2);

    circle.offsetX(5);
    assert.equal(circle.offsetX(), 5);

    circle.offsetY(8);
    assert.equal(circle.offsetY(), 8);

    circle.width(23);
    assert.equal(circle.width(), 23); 

    circle.height(11);
    assert.equal(circle.height(), 11); 

    circle.listening(false);
    assert.equal(circle.listening(), false);

    circle.visible(false);
    assert.equal(circle.visible(), false); 

    circle.transformsEnabled(false);
    assert.equal(circle.transformsEnabled(), false);  

    circle.position({x: 6, y: 8});
    assert.equal(circle.position().x, 6);
    assert.equal(circle.position().y, 8);
  });

  test('cache shape', function(){
    var stage = addStage();
    var layer = new Kinetic.Layer();
    var group = new Kinetic.Group();
    var circle = new Kinetic.Circle({
        x: 100,
        y: 100,
        radius: 70,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 4,
        name: 'myCircle',
        draggable: true
    });

    group.add(circle);
    layer.add(group);
    stage.add(layer);

    console.log('-- before cache')

    assert.equal(circle._cache['sceneCanvas'], undefined);
    assert.equal(circle._cache['hitCanvas'], undefined);

    circle.cache({
        width: 100,
        height: 100
    });

    assert.notEqual(circle._cache['sceneCanvas'], undefined);
    assert.notEqual(circle._cache['hitCanvas'], undefined);

    
    layer.draw();


    document.body.appendChild(circle._cache.sceneCanvas._canvas);
    document.body.appendChild(circle._cache.hitCanvas._canvas);


    console.log(layer.getContext().getTrace());


  });
});