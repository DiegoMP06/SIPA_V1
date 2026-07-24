<?php

namespace App\Http\Middleware;

use App\Models\Period;
use App\Models\Semester;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CanReRegistration
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!Semester::canReRegistration() || !Period::canReRegister()) {
            return redirect()->intended(route('home', absolute: false));
        }

        return $next($request);
    }
}
