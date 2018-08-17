const mongoose = require('mongoose'),
Task = mongoose.model('Task');

class Tasks{

	all(request, response){
		Task.find({}, function(err, tasks){
			if (err) {
				response.json({'status':500, 'errors': err});
			}
			else {
				response.json({'status': 200, 'tasks': tasks})
			}
		});
	}
	findOne(request, response){
		Task.findById(request.params.id, function(err, tasks){
			if (err) {
				response.json({'status':500, 'errors': err});
			}
			else {
				response.json({'status': 200, 'tasks': tasks})
			}
		});
	}
	create(request, response){
		Task.create(request.body, function(err, tasks){
			if (err) {
				response.json({'status':500, 'errors': err});
			}
			else {
				response.json({'status': 200, 'tasks': tasks})
			}
		});
	}
	all(request, response){
		Task.find({}, function(err, tasks){
			if (err) {
				response.json({'status':500, 'errors': err});
			}
			else {
				response.json({'status': 200, 'tasks': tasks})
			}
		});
	}
	update(request, response){
		Task.update({_id: request.params.id}, request.body, function(err, tasks){
			if (err) {
				response.json({'status':500, 'errors': err});
			}
			else {
				response.json({'status': 200, 'tasks': tasks})
			}
		});
	}
	delete(request, response){
		Task.remove({_id: request.params.id}, function(err, tasks){
			if (err) {
				response.json({'status':500, 'errors': err});
			}
			else {
				response.json({'status': 200, 'tasks': tasks})
			}
		});
	}
}

module.export = new Tasks();