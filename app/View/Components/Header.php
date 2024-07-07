<?php

namespace App\View\Components;

use Closure;
use App\Models\Pay;
use Illuminate\View\Component;
use Illuminate\Contracts\View\View;

class Header extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(
        public Pay $pay,
        public $date,
        public $sep,
        public $logo211,
        public $dgeti,
    )
    { }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.header');
    }
}
