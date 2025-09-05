<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{

    public function index(){
        $users = User::paginate(10);
        return Inertia::render('admin/users/index', [
            'users' => $users
        ]);
    }
    public function edit(User $user) {
        return Inertia::render('admin/users/edit', [
            'user' => $user
        ]);
    }

    public function update(Request $request, User $user) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,' . $user->id,
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $user->update($validated);

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }
}
