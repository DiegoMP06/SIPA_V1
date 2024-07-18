<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Period;
use App\Models\Semester;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CanRegistration
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!Semester::canRegistration() || !Period::canRegister()) {
            return redirect()->intended(route('home', absolute: false));
        }

        return $next($request);
    }
}
