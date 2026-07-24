<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Period;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class OpenArea
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!Period::canPay() && !$request->user()) {
            return redirect()->intended(route('home', absolute: true));
        }

        return $next($request);
    }
}
