<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::update([
            'name' => 'Admin Mauk',
            'email' => 'admin_mauk@email.com',
            'password' => 'password',
        ]);
    }
}
