<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call(SemesterSeeder::class);
        $this->call(ShiftSeeder::class);
        $this->call(SpecialtySeeder::class);
        $this->call(TypePaySeeder::class);

        User::factory()->create([
            'name' => 'Administrador SIPA 211',
            'email' => 'correo@correo.com',
            'password' => 'password',
        ]);
    }
}
