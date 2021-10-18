function setup() {
  createCanvas(640,500);
  background(55);
  pixelDensity(1);
  loadPixels();

  let alpha = 255;
  const ITER = 200;

  for(let x=0; x<width;x++) {
    for (let y=0; y<height;y++) {

      let a = map(x,0,width,-2.4,0.6);
      let b = map(y,0,height,-1.5,1.5);

      let a_ = a, b_=b;

      let n=0, z=0;

      while (n<ITER) {
        let re = a*a - b*b;
        let im = 2*a*b;

        a = re+a_; b=im+b_;

        if (abs(a+b)>16) {
          break;
        }

        n++;
      }

      alpha = map(n,0,ITER,0,1);
      alpha = map(sqrt(alpha),0,1,0,255);
      if (n==ITER) alpha=0;

      var pixel = (x+y*width)*4;
      pixels[pixel+0] = alpha;
      pixels[pixel+1] = alpha;
      pixels[pixel+2] = alpha;
      pixels[pixel+3] = 255;
    }
  }
  updatePixels();
}