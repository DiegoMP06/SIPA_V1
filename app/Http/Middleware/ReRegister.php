<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Semester;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ReRegister
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!Semester::canReRegister()) {
            return redirect()->intended(route('home', absolute: true));
        }

        return $next($request);
    }
}
