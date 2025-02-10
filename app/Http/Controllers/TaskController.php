<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $perPage = request()->query('perPage', 10);
        return response()->json(Task::select('id', 'name', 'description', 'color', 'text_color')->paginate($perPage));
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
            'color' => 'required|string|max:7',  
            'text_color' => 'required|string|max:7',
        ]);

        $task = Task::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'color' => $validatedData['color'],
            'text_color' => $validatedData['text_color'],
        ]);

        return response()->json(['message' => 'Task created successfully!', 'task' => $task], 201);
    }
}
