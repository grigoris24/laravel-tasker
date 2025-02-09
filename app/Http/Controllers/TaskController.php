<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

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

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $task = Task::create($validatedData);

        return response()->json(['message' => 'Task created successfully!', 'task' => $task], 201);
    }

    
}


