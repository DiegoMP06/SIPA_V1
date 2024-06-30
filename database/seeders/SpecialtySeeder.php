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
            'code' => 'ADRH',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('specialties')->insert([
            'specialty' => 'Contabilidad',
            'code' => strtoupper('Conta'),
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
            'code' => strtoupper('Progra'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('specialties')->insert([
            'specialty' => 'Ventas',
            'code' => strtoupper('Ventas'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
