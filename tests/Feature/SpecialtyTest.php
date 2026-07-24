<?php

namespace Tests\Feature;

use App\Models\Specialty;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SpecialtyTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_and_toggle_specialty_activation(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $response = $this->post(route('specialties.store'), [
            'specialty' => 'Informática',
            'code' => 'INF',
            'active' => true,
        ]);

        $response->assertRedirect();

        $specialty = Specialty::where('code', 'INF')->first();

        $this->assertNotNull($specialty);
        $this->assertTrue($specialty->active);

        $response = $this->patch(route('specialties.update', $specialty), [
            'specialty' => 'Informática',
            'code' => 'INF',
            'active' => false,
        ]);

        $response->assertRedirect();

        $specialty->refresh();

        $this->assertFalse($specialty->active);
    }
}
