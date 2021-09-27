class NeuralNetwork {
	constructor (Inb,Hnb,Onb) {
		this.Inb = Inb;
		this.Hnb = Hnb;
		this.Onb = Onb;
//Standard
		this.weight_ih =  nj.random([this.Hnb,this.Inb]);
		this.weight_ho = nj.random([this.Onb,this.Hnb]);
		this.bias_h = nj.random([this.Hnb,1]);
		this.bias_o = nj.random([this.Onb,1]);
// Mine
		this.wih =  new Matrix(this.Hnb,this.Inb);
		this.who = new Matrix(this.Onb,this.Hnb);
		this.bh = new Matrix(this.Hnb,1);
		this.bo = new Matrix(this.Onb,1);
		this.wih.randomize();
		this.who.randomize();
		this.bh.randomize();
		this.bo.randomize();
//--
		this.learnbing_rate = 0.1;
	}

	feedforward(input) {
		console.log('//--------- FEEDFORWARD');
		// console.log('input',input);
		let poids = this.weight_ih.selection.data;
		 console.log('weight_ih',poids);
		// console.log('this.bias_h',this.bias_h);
		//generate Hidden
			let hidden = nj.dot(this.weight_ih,input);
			// console.log('hidden',hidden);
			hidden.add(this.bias_h);
			let hidden_o = mapFct(hidden,sigmoid);

			// console.log('activation',hidden);
		//generate Output
			let output = nj.dot(this.weight_ho,hidden_o);
			// console.log('weight_ho',this.weight_ho);
			// console.log('output',output);
			// console.log('this.bias_o',this.bias_o);
			output.add(this.bias_o);
			let guess = mapFct(output,sigmoid);

			// console.log('guess',guess);


		return guess;
	}

	feedforward_EP(a) {
		let input = Matrix.fromArray(a);
		let h_i = Matrix.multiply(this.wih,input);
		h_i.add(this.bh);
		h_i.map(sigmoid);
		// h_i.print();
		let o_i = Matrix.multiply(this.who,h_i);
		o_i.add(this.bo);
		o_i.map(sigmoid);
		
		return o_i;
	}


	feedforward2(input) {
		let h_i = nj.dot(this.weight_ih,input);
		let h_o = mapFct(h_i,sigmoid);
		let o_i = nj.dot(this.weight_ho,h_o);
		let o = mapFct(o_i,sigmoid);
		return o;
	}

	train_EP(a,b) {
		let input = Matrix.fromArray(a);
		let answer = Matrix.fromArray(b);

		let h_i = Matrix.multiply(this.wih,input);
		h_i.add(this.bh);
		h_i.map(sigmoid);
		// h_i.print();
		let o_i = Matrix.multiply(this.who,h_i);
		o_i.add(this.bo);
		o_i.map(sigmoid);

		let o_e = Matrix.subtract(answer,o_i);
		let whoT = this.who.transpose();
		// this.who.print();
		// whoT.print();
		let h_e = Matrix.multiply(whoT,o_e);
		o_i.map(dsigmoid);
		let g_o = Matrix.multiply(o_i,o_e);
		g_o.multiply(this.learnbing_rate);

		h_i.map(dsigmoid);
		h_i.print();
		h_e.print();
		let g_h = h_i;
		g_h.print();
		g_h.multiply(h_e);
		g_h.print();
		g_h.multiply(this.learnbing_rate);
		let h_oT = h_i.transpose();
		let d_o = Matrix.multiply(g_o,h_oT);
		this.who.add(d_o);
		let inputT = input.transpose();
		let d_h = Matrix.multiply(g_h,inputT);
		this.wih.add(d_h);
this.wih.print();
	}

	train2(input,answer) {
		let h_i = nj.dot(this.weight_ih,input);
		let h_o = mapFct(h_i,sigmoid);
		let o_i = nj.dot(this.weight_ho,h_o);
		let o = mapFct(o_i,sigmoid);
		let o_e = nj.subtract(answer,o);
		let h_e = nj.dot(this.weight_ho.T,o_e);

		let g_o = mapFct(o,dsigmoid);
		g_o.multiply(o_e);
		g_o.multiply(this.learnbing_rate);

		let g_h = mapFct(h_o,dsigmoid);
		g_h.multiply(h_e);

		g_h.multiply(this.learnbing_rate);
		let d_o = nj.dot(g_o,h_o.T);
		this.weight_ho.add(d_o);
		let d_h = nj.dot(g_h,input.T);
		this.weight_ih.add(d_h);
	}

	train(input,answer) {
		// console.log('//----------  Start TRAIN .....');
		// console.log(input.selection.data);
		let hidden_i = nj.dot(this.weight_ih,input); //dot
		hidden_i = nj.add(hidden_i,this.bias_h); //= nj.add(this.bias_h,hidden);
		let hidden_o = mapFct(hidden_i,sigmoid);
		let output = nj.dot(this.weight_ho,hidden_o); //dot
		output = nj.add(output,this.bias_o);
		let o_h = mapFct(output,sigmoid);
		let o_error = nj.subtract(answer,output);
		let gradient = mapFct(o_h,dsigmoid);
		gradient = nj.dot(gradient,o_error); //DOT ???
		gradient = nj.multiply(gradient,this.learnbing_rate);
		let delta_ho = nj.dot(gradient,hidden_o.T); // dot
		this.weight_ho = nj.add(this.weight_ho,delta_ho);
		this.bias_o = nj.add(this.bias_o,gradient);
		let h_error = nj.dot(this.weight_ho.T,o_error);
		let h_gradient = mapFct(hidden_o,dsigmoid);
		h_gradient = nj.dot(h_gradient,h_error); // DOT
		h_gradient = nj.multiply(h_gradient,this.learnbing_rate);
		let delta_ih = nj.dot(h_gradient,input.T);
		this.weight_ih = nj.add(this.weight_ih,delta_ih);
		this.bias_h = nj.add(this.bias_h,h_gradient);
		// console.log(delta_ih.selection.data);
		// console.log('ici delta_ho',delta_ho.selection.data);
		// console.log(this.weight_ih.selection.data);
		// console.log(this.weight_ho.selection.data);
	}

}


// function matrix_random(a,r,c) {
// 	for (let i =0;i<r;i++) {
// 		for(let j =0;j<c;j++) {
// 			a.subset(math.index(i,j), Math.random()*2-1);
// 		}
// 	}
// }


function sigmoid(x) {
	return (1/(1+Math.exp(-x)));
	// let y = 1 / (1 + pow(Math.E, -x));
	// return y;
}


function dsigmoid(y) {
	return (y * (1-y));
}


function mapFct(a,func) {
	let ret = nj.zeros([a.shape[0],a.shape[1]]);
	for (let i=0; i<a.shape[0];i++) {
		if (a.ndim>1) {
	 		for( let j = 0;j<a.shape[1];j++) {
				let v = a.get(i,j);
				ret.set(i,j, func(v));
			}
		} else {
				let v = a.get(i);
				ret.set(i, func(v));
		}
	}
	return ret;
}