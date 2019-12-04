// global math
// const math = require("mathjs");

/* 
USE XOR gate to test neural Neural

var nn = new neuralNetwork(NUM_INPUTS, NUM_HIDDEN, NUM_OUTPUT);

test with XOR gate samples, 4 different scenarios
0 0 0
0 1 1
1 0 1
1 1 0

  for (let i = 0; i < NUM_SAMPLES; i++) {
    let input0 = Math.round(Math.random()); // 0 or 1
    let input1 = Math.round(Math.random()); // 0 or 1
    nn.train([input0, input1], [input0 === input1 ? 0 : 1]);
  }

  console.log("0, 0 = " + nn.feedForward([0, 0])._data);
  console.log("0, 1 = " + nn.feedForward([0, 1])._data);
  console.log("1, 0 = " + nn.feedForward([1, 0])._data);
  console.log("1, 1 = " + nn.feedForward([1, 1])._data); 
*/

const LOG_ON = true; // whether or not to show log error
const LOG_FREQUENCY = 20000; // how often to show log in interations

class NeuralNetwork {
  constructor(numInputs = 1, numHidden = 1, numOutputs = 1) {
    this._numInputs = numInputs;
    this._numHidden = numHidden;
    this._hidden = [];
    this._inputs = [];
    this._numOutputs = numOutputs;
    this._bias0 = math.ones(1, this._numHidden);
    this._bias1 = math.ones(1, this._numOutputs);
    this._weights0 = math.ones(this._numInputs, this._numHidden);
    this._weights1 = math.ones(this._numHidden, this._numOutputs);

    this._logCount = LOG_FREQUENCY;

    // randomise initial weights
    this._weights0 = this._weights0.map(val =>
      math.multiply(val, Math.random() * 2 - 1)
    );
    this._weights1 = this._weights1.map(val =>
      math.multiply(val, Math.random() * 2 - 1)
    );
    this._bias0 = this._bias0.map(val =>
      math.multiply(val, Math.random() * 2 - 1)
    );
    this._bias1 = this._bias1.map(val =>
      math.multiply(val, Math.random() * 2 - 1)
    );
  }

  get inputs() {
    return this._inputs;
  }

  set inputs(inputs) {
    this._inputs = inputs;
  }

  get hidden() {
    return this._hidden;
  }

  set hidden(hidden) {
    this._hidden = hidden;
  }

  get weights0() {
    return this._weights0;
  }

  set weights0(weights) {
    this._weights0 = weights;
  }

  get logCount() {
    return this._logCount;
  }

  set logCount(logCount) {
    this._logCount = logCount;
  }

  get weights1() {
    return this._weights1;
  }

  set weights1(weights) {
    this._weights1 = weights;
  }

  feedForward(inputArray) {
    // convert input array into matrix
    this._inputs = math.matrix([inputArray]);

    // find the hidden values and apply the activation function
    this.hidden = math.multiply(this._inputs, this._weights0);
    this.hidden = math.add(this.hidden, this._bias0);
    this.hidden = this.hidden.map(val => sigmoid(val));
    // find the output values and apply the activation funciton
    let outputs = math.multiply(this.hidden, this._weights1);
    outputs = math.add(outputs, this._bias1);
    outputs = outputs.map(val => sigmoid(val));

    return outputs;
  }

  train(inputArray, targetArray) {
    // 1. feed the input data through the network
    let outputs = this.feedForward(inputArray);

    // 2. calculate the output errors (target - output)
    let targets = math.matrix([targetArray]);
    let outputErrors = math.subtract(targets, outputs);

    // ERROR logging
    if (LOG_ON) {
      if (this.logCount === LOG_FREQUENCY) {
        console.log("Error = ", outputErrors._data[0][0]);
      }

      this.logCount -= 1;

      if (this.logCount === 0) {
        this.logCount = LOG_FREQUENCY;
      }
    }

    // 3. calculate the output gradient/deltas (errors * derivitive of the output)
    let outputDerivs = outputs.map(val => sigmoid(val, true));
    let outputDeltas = math.dotMultiply(outputErrors, outputDerivs); // important!

    // 4. calculate this.hidden layer errors (deltas 'dot' transpose of weights1)
    let weights1T = math.transpose(this.weights1);
    let hiddenErrors = math.multiply(outputDeltas, weights1T);
    // calculate the hidden gradient/delta (errors * derivitive of the output)
    let hiddenDerivs = this.hidden.map(val => sigmoid(val, true));
    let hiddenDeltas = math.dotMultiply(hiddenErrors, hiddenDerivs); // important!

    // 5. update the weights ( add transpose of layers 'dot' deltas)
    let hiddenT = math.transpose(this.hidden);
    this.weights1 = math.add(
      this.weights1,
      math.multiply(hiddenT, outputDeltas)
    );

    let inputsT = math.transpose(this.inputs);
    this.weights0 = math.add(
      this.weights0,
      math.multiply(inputsT, hiddenDeltas)
    );

    // update bias
    this.bias1 = math.add(this._bias1, outputDeltas);
    this.bias0 = math.add(this._bias0, hiddenDeltas);
  }
}

function sigmoid(x, deriv = false) {
  if (deriv) {
    // where x = sigmoid(x), result been calculated in the last step in feedforward
    return x * (1 - x);
  }
  return 1 / (1 + Math.exp(-x));
}

export default NeuralNetwork;
