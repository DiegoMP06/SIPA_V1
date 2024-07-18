<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypePaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('type_pays')->insert([
            'type' => 'Inscripción',
            'code' => 'INSCRIPCIÓN',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('type_pays')->insert([
            'type' => 'Reinscripción',
            'code' => 'REINSCRIPCIÓN',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('type_pays')->insert([
            'type' => 'Exámen Extraordinario',
            'code' => 'EXÁMEN EXTRAORDINARIO',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('type_pays')->insert([
            'type' => 'Recursamiento Intersemestral',
            'code' => 'RECURSAMIENTO INTERSEMESTRIAL',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
