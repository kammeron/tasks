// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/restful', { useNewUrlParser: true });
var TaskSchema = new mongoose.Schema({
	title: {type: String, required: true},
	description: {type: String},
	completed: {type: Boolean, default: false},
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
	descIsHidden: {type: Boolean, default: false}
}, {timestamps: true});
mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task')
// Integrate body-parser with our App
var path = require('path');
app.use(express.static(path.join(__dirname, 'public/dist/public')));
app.use(bodyParser.json());
// Routes
app.get('/', (request, response) => {
	response.render('index')
})
app.get('/tasks', (request, response) => {
	Task.find({}, function(err, data){
		if (err) {
			console.log('something went wrong finding task')
		}
		else {
			response.send(data)
		}
	})
});
app.get('/tasks/:id', (request, response) => {
	id = request.params.id;
	Task.find({_id: id}, function(err, data){
		if (err) {
			console.log(id)
			console.log('something went wrong finding task')
		}
		else {
			response.send(data)
		}
	})
})
app.post('/tasks', (request, response) => {
	title = request.body.title;
	desc = request.body.description;
	completed = request.body.completed;
	var taskInstance = new Task();
	taskInstance.title = title;
	taskInstance.description = desc;
	taskInstance.completed = completed;
	taskInstance.save(function(err){
		if (err) {
			console.log('something went wrong saving task');
			response.redirect('/tasks')
		}
		else {
			console.log('success saving task!');
			response.redirect('/tasks')
		}
	})
});
app.put('/tasks/:id', (request, response) => {
	id = request.params.id;
	title = request.body.title;
	desc = request.body.description;
	completed = request.body.completed;
	Task.findById(id, function(err, task){
		task.title = title;
		task.description = desc;
		task.completed = completed;
		task.save(function(err){
			if (err) {
				console.log('something went wrong saving task');
				response.redirect('/tasks')
			}
			else {
				console.log('success saving task!');
			}
		})
	})
	// a = request.body;
	// if (request.body.title) {
	// 	Task.update({_id: id}, {title: request.body.title}), function(err){
	// 		console.log(request.body.title)
	// 		console.log(a)
	// 		if (err) {
	// 			console.log('something went wrong')
	// 			response.redirect('/tasks')
	// 		}
	// 	}
	// }
	// if (request.body.description) {
	// 	Task.update({_id: id}, {$set: {description: request.body.description}}), function(err){
	// 		if (err) {
	// 			console.log('something went wrong')
	// 			response.redirect('/tasks')
	// 		}
	// 	}
	// }
	// if (request.body.completed){
	// 	Task.update({_id: id}, {$set: {completed: request.body.completed}}), function(err){
	// 		if (err) {
	// 			console.log('something went wrong')
	// 			response.redirect('/tasks')
	// 		}
	// 	}
	// }
	// response.redirect('/tasks')
});
app.delete('/tasks/:id', (request, response) => {
	id = request.params.id;
	Task.remove({_id: id}, function(err){
		if (err) {
			console.log('something went wrong with removing ' + id)
		}
		else {
			console.log('success in removing ' + id)
		}
	})
});
app.listen(8000, function() {
	console.log('listening on port 8000');
})

//
// console.log('server.js works') 
// const express = require('express')