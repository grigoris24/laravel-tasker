<?php

namespace App\Http\Controllers;

use App\Models\Task;

class TaskController extends Controller
{
    public function index()
{
    $perPage = request()->query('perPage', 10);
    return response()->json(Task::select('id', 'name', 'description')->paginate($perPage));
}


    public function getDescription($taskId)
    {
        $task = Task::find($taskId);
        if ($task) {
            return response()->json(['description' => $task->description]);
        }
        return response()->json(['error' => 'Task not found'], 404);
    }
}


