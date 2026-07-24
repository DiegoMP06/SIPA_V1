<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SpecialtySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('specialties')->insert([
            'specialty' => 'Administración de Recursos Humanos',
            'code' => 'ARH',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('specialties')->insert([
            'specialty' => 'Contabilidad',
            'code' => 'C',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('specialties')->insert([
            'specialty' => 'Preparación de Alimentos y Bebidas',
            'code' => 'PAB',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('specialties')->insert([
            'specialty' => 'Producción Industrial de Alimentos',
            'code' => 'PIA',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('specialties')->insert([
            'specialty' => 'Programación',
            'code' => 'P',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('specialties')->insert([
            'specialty' => 'Ventas',
            'code' => 'V',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
