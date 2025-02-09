<?php

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::get('/tasks', [TaskController::class, 'index']);
Route::put('/tasks/{id}', function (Request $request, $id) {
    $task = Task::findOrFail($id);
    $task->update($request->all());
    return response()->json(['message' => 'Task updated successfully']);
});

Route::get('/tasks/{taskId}/description', [TaskController::class, 'getDescription']);

Route::post('/tasks', [TaskController::class, 'store']);
