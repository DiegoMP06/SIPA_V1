<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SemesterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('semesters')->insert([
            'semester' => 1,
            'group' => 'A',
            'active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('semesters')->insert([
            'semester' => 2,
            'group' => 'A',
            'active' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('semesters')->insert([
            'semester' => 3,
            'group' => 'A',
            'active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('semesters')->insert([
            'semester' => 4,
            'group' => 'A',
            'active' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('semesters')->insert([
            'semester' => 5,
            'group' => 'A',
            'active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('semesters')->insert([
            'semester' => 6,
            'group' => 'A',
            'active' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
