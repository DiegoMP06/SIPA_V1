<?php

namespace Tests\Feature;

use App\Models\TypePay;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TypePayTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_and_toggle_type_pay_activation(): void
    {
        $this->withoutMiddleware();

        $user = User::factory()->create();

        $this->actingAs($user);

        $response = $this->post(route('type-pays.store'), [
            'type' => 'Registro',
            'code' => 'REG',
            'active' => true,
        ]);

        $response->assertRedirect();

        $typePay = TypePay::where('code', 'REG')->first();

        $this->assertNotNull($typePay);
        $this->assertTrue($typePay->active);

        $response = $this->patch(route('type-pays.update', $typePay), [
            'type' => 'Registro',
            'code' => 'REG',
            'active' => false,
        ]);

        $response->assertRedirect();

        $typePay->refresh();

        $this->assertFalse($typePay->active);
    }
}
