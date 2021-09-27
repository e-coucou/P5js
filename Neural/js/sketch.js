
let nn = new NeuralNetwork(2,2,1);

let training_data_std = [
		{ input: nj.array([[1],[0]]), output: nj.array([[1]])},
		{ input: nj.array([[0],[1]]), output: nj.array([[1]])},
		{ input: nj.array([[0],[0]]), output: nj.array([[0]])},
		{ input: nj.array([[1],[1]]), output: nj.array([[0]])}
	];
let training_data = [
		{ input: [1,0], output: [1]},
		{ input: [0,1], output: [1]},
		{ input: [1,1], output: [0]},
		{ input: [0,0], output: [0]},
	];

function setup() {

	let input = nj.array([[1],[0]]);
	let epI = [1,0];
	let guess = nn.feedforward_EP(epI);
	guess.print();
	// input.reshape(2,1);
	// input.set(0,0,1);
	// input.set(1,0,0);
	// let input = math.ones(2,1);
	// input.subset(math.index(0,0),1);
	// input.subset(math.index(1,0),0);

	// let output = nn.feedforward(input);
	// console.log(output);
	for (let i = 0; i< 10; i++) {
		let data = random(training_data)
		nn.train_EP(data.input,data.output);
		// let data = random(training_data_std)
		// nn.train2(data.input,data.output);
	}

	// console.log(nn.feedforward2(nj.array([[1],[0]])).selection.data);
	// console.log(nn.feedforward2(nj.array([[0],[1]])).selection.data);
	// console.log(nn.feedforward2(nj.array([[1],[1]])).selection.data);
	// console.log(nn.feedforward2(nj.array([[0],[0]])).selection.data);
}