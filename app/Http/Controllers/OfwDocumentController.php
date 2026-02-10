<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OfwDocument;
use Illuminate\Support\Facades\Storage;

class OfwDocumentController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'ofw_id' => 'required|exists:ofws,id',
            'type' => 'required|string|max:50',
            'file' => 'required|file|max:10240', // max 10MB
        ]);

        // Store file in storage/app/documents
        $filePath = $request->file('file')->store('documents');

        $document = OfwDocument::create([
            'ofw_id' => $request->ofw_id,
            'type' => $request->type,
            'file_path' => $filePath,
            'status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'data' => $document,
        ]);
    }

    public function getDocuments($ofwId)
    {
        $documents = OfwDocument::where('ofw_id', $ofwId)->get();

        return response()->json([
            'success' => true,
            'data' => $documents,
        ]);
    }
}
