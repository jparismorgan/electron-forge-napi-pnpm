{
  "targets": [
    {
      "target_name": "llm",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "sources": [ 
        "llm.cc", 
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
      ],
    }
  ]
}