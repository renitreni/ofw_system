<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ofw_documents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ofw_id');
            $table->string('type');
            $table->string('file_path');
            $table->string('status')->default('pending');
            $table->unsignedBigInteger('verified_by')->nullable();
            $table->timestamps();

            $table->foreign('ofw_id')->references('id')->on('ofws')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ofw_documents');
    }
};
