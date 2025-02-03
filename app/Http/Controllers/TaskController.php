<?php

namespace App\Http\Controllers;

use App\Models\Task;

class TaskController extends Controller
{
    public function index()
    {
        return response()->json(Task::select('id', 'name', 'description')->get());
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


