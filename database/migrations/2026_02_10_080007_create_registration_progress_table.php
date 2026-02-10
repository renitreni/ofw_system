<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('registration_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ofw_id')->constrained('ofws')->onDelete('cascade');
            $table->json('form_data')->nullable();
            $table->json('completed_steps')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registration_progress');
    }
};
