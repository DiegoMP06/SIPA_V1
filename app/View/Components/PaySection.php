<?php

namespace App\View\Components;

use App\Models\Pay;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class PaySection extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(
        public string $section,
        public Pay $pay,
        public $sep,
        public $dgeti,
        public $logo211,
        public $date,
        public $banco,
        public $sat,
    )
    {}

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.pay-section');
    }
}
