suite('Mirror', function () {
    // ======================================================
    test('both', function (done) {
        var stage = addStage();

        var shapesLayer = new Kinetic.Layer();

        // The important line!
        shapesLayer.on('draw', function () {
          var imageData = this.getContext().getImageData(0,0,this.getCanvas().width,this.getCanvas().height);
          var scratchData = this.getContext().createImageData(imageData); // only size copied
          Kinetic.Filters.MirrorX(imageData,scratchData,{});
          Kinetic.Filters.MirrorY(scratchData,imageData,{});
          this.getContext().putImageData(imageData,0,0);
          //this.getContext().putImageData(scratchData,0,0);
        });

        var triangle = new Kinetic.RegularPolygon({
          x: stage.getWidth() / 4,
          y: stage.getHeight() / 2,
          sides: 3,
          radius: 80,
          fillRadialGradientStartPoint: 0,
          fillRadialGradientStartRadius: 0,
          fillRadialGradientEndPoint: 0,
          fillRadialGradientEndRadius: 70,
          fillRadialGradientColorStops: [0, '#881111', 0.5, '#888811', 1, '#000088'],
          stroke: 'black',
          strokeWidth: 4,
          draggable: true
        });

        var circle = new Kinetic.Circle({
          x: 3 * stage.getWidth() / 4,
          y: stage.getHeight() / 2,
          radius: 70,
          fill: '#880000',
          stroke: 'black',
          strokeWidth: 4,
          draggable: true,
          id: 'myCircle'
        });

        for( var i=0; i<10; i+=1 ){
          for( var j=0; j<10; j+=1 ){
            var rect = new Kinetic.Rect({
              x: i/10*stage.getWidth(),
              y: j/10*stage.getHeight(),
              width: stage.getWidth()/10,
              height: stage.getHeight()/10,
              fill: (i+j)%2===0?'#FF0000':'#FFFF00',
              stroke: 'black',
              strokeWidth: 4,
              draggable: true
            });
            shapesLayer.add(rect);
          }
        }

        shapesLayer.add(circle);
        shapesLayer.add(triangle);

        stage.add(shapesLayer);

        done();
    });

    // ======================================================
    test('horizontal', function (done) {
        var stage = addStage();

        var shapesLayer = new Kinetic.Layer();

        // The important line!
        shapesLayer.on('draw', function () {
          var imageData = this.getContext().getImageData(0,0,this.getCanvas().width,this.getCanvas().height);
          var scratchData = this.getContext().createImageData(imageData); // only size copied
          Kinetic.Filters.MirrorX(imageData,scratchData,{});
          this.getContext().putImageData(scratchData,0,0);
        });

        var triangle = new Kinetic.RegularPolygon({
          x: stage.getWidth() / 4,
          y: stage.getHeight() / 2,
          sides: 3,
          radius: 80,
          fillRadialGradientStartPoint: 0,
          fillRadialGradientStartRadius: 0,
          fillRadialGradientEndPoint: 0,
          fillRadialGradientEndRadius: 70,
          fillRadialGradientColorStops: [0, '#881111', 0.5, '#888811', 1, '#000088'],
          stroke: 'black',
          strokeWidth: 4,
          draggable: true
        });

        var circle = new Kinetic.Circle({
          x: 3 * stage.getWidth() / 4,
          y: stage.getHeight() / 2,
          radius: 70,
          fill: '#880000',
          stroke: 'black',
          strokeWidth: 4,
          draggable: true,
          id: 'myCircle'
        });

        for( var i=0; i<10; i+=1 ){
          for( var j=0; j<10; j+=1 ){
            var rect = new Kinetic.Rect({
              x: i/10*stage.getWidth(),
              y: j/10*stage.getHeight(),
              width: stage.getWidth()/10,
              height: stage.getHeight()/10,
              fill: (i+j)%2===0?'#FF0000':'#FFFF00',
              stroke: 'black',
              strokeWidth: 4,
              draggable: true
            });
            shapesLayer.add(rect);
          }
        }

        shapesLayer.add(circle);
        shapesLayer.add(triangle);

        stage.add(shapesLayer);

        done();
    });

    // ======================================================
    test('vertical', function (done) {
        var stage = addStage();

        var shapesLayer = new Kinetic.Layer();

        // The important line!
        shapesLayer.on('draw', function () {
          var imageData = this.getContext().getImageData(0,0,this.getCanvas().width,this.getCanvas().height);
          var scratchData = this.getContext().createImageData(imageData); // only size copied
          Kinetic.Filters.MirrorY(imageData,scratchData,{});
          this.getContext().putImageData(scratchData,0,0);
        });

        var triangle = new Kinetic.RegularPolygon({
          x: stage.getWidth() / 4,
          y: stage.getHeight() / 2,
          sides: 3,
          radius: 80,
          fillRadialGradientStartPoint: 0,
          fillRadialGradientStartRadius: 0,
          fillRadialGradientEndPoint: 0,
          fillRadialGradientEndRadius: 70,
          fillRadialGradientColorStops: [0, '#881111', 0.5, '#888811', 1, '#000088'],
          stroke: 'black',
          strokeWidth: 4,
          draggable: true
        });

        var circle = new Kinetic.Circle({
          x: 3 * stage.getWidth() / 4,
          y: stage.getHeight() / 2,
          radius: 70,
          fill: '#880000',
          stroke: 'black',
          strokeWidth: 4,
          draggable: true,
          id: 'myCircle'
        });

        for( var i=0; i<10; i+=1 ){
          for( var j=0; j<10; j+=1 ){
            var rect = new Kinetic.Rect({
              x: i/10*stage.getWidth(),
              y: j/10*stage.getHeight(),
              width: stage.getWidth()/10,
              height: stage.getHeight()/10,
              fill: (i+j)%2===0?'#FF0000':'#FFFF00',
              stroke: 'black',
              strokeWidth: 4,
              draggable: true
            });
            shapesLayer.add(rect);
          }
        }

        shapesLayer.add(circle);
        shapesLayer.add(triangle);

        stage.add(shapesLayer);

        done();
    });

    // ======================================================
    test('on image', function(done) {
        var stage = addStage();

        var imageObj = new Image();
        imageObj.onload = function() {
            
            var layer = new Kinetic.Layer();
            var xMirror = new Kinetic.Image({
                x: 160,
                y: 10,
                image: imageObj,
                draggable: true,
                filter: Kinetic.Filters.MirrorX
            });
            var yMirror = new Kinetic.Image({
                x: 320,
                y: 10,
                image: imageObj,
                draggable: true,
                filter: Kinetic.Filters.MirrorY
            });
            var noMirror = new Kinetic.Image({
                x: 0,
                y: 10,
                image: imageObj,
                draggable: true
            });

            layer.add(noMirror);
            layer.add(xMirror);
            layer.add(yMirror);
            stage.add(layer);

            layer.draw();

            done();
        };
        imageObj.src = 'assets/lion.png';

    });

});
