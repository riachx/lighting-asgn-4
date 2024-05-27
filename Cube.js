class Cube {
  constructor() {
    this.type = 'cube';
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
    this.textureNum = -1;
    this.verts = [
      //front
      0, 0, 0, 1, 1, 0, 1, 0, 0,
      0, 0, 0, 0, 1, 0, 1, 1, 0,

      //top
      0, 1, 0, 0, 1, 1, 1, 1, 1,
      0, 1, 0, 1, 1, 1, 1, 1, 0,

      //bottom
      0, 1, 0, 0, 1, 1, 1, 1, 1,
      0, 1, 0, 1, 1, 1, 1, 1, 0,

      // left
      1, 0, 0, 1, 1, 1, 1, 1, 0,
      1, 0, 0, 1, 0, 1, 1, 1, 1,

      // right
      0, 0, 0, 0, 1, 1, 0, 1, 0,
      0, 0, 0, 0, 0, 1, 0, 1, 1,

      // back
      0, 0, 1, 1, 1, 1, 0, 1, 1,
      0, 0, 1, 1, 0, 1, 1, 1, 1
    ];
    this.vert32bit = new Float32Array([
      0, 0, 0, 1, 1, 0, 1, 0, 0,
      0, 0, 0, 0, 1, 0, 1, 1, 0,

      0, 1, 0, 0, 1, 1, 1, 1, 1,
      0, 1, 0, 1, 1, 1, 1, 1, 0,

      0, 1, 0, 0, 1, 1, 1, 1, 1,
      0, 1, 0, 1, 1, 1, 1, 1, 0,

      0, 0, 0, 1, 0, 1, 0, 0, 1,
      0, 0, 0, 1, 0, 0, 1, 0, 1,

      1, 0, 0, 1, 1, 1, 1, 1, 0,
      1, 0, 0, 1, 0, 1, 1, 1, 1,

      0, 0, 1, 1, 1, 1, 0, 1, 1,
      0, 0, 1, 1, 0, 1, 1, 1, 1
    ]);
    this.uvVerts = [
      0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1,
      0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1,
      0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1,
      0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1,
      0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1,
      0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1
    ];
    this.dirt = false;
  }
  render() {
    var rgba = this.color;

    gl.uniform1i(u_whichTexture, this.textureNum);

    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
    
    drawTriangle3DUVNormal([0, 0, 0, 1, 1, 0, 1, 0, 0], [0, 0, 1, 1, 1, 0], [0, 0, -1, 0, 0, -1, 0, 0, -1]);
    drawTriangle3DUVNormal([0, 0, 0, 0, 1, 0, 1, 1, 0], [0, 0, 0, 1, 1, 1], [0, 0, -1, 0, 0, -1, 0, 0, -1]);

    //gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9,rgba[3]);
    drawTriangle3DUVNormal([1, 1, 0, 1, 1, 1, 0, 1, 0], [1, 0, 1, 1, 0, 0], [0, 1, 0, 0, 1, 0, 0, 1, 0]);
    drawTriangle3DUVNormal([0, 1, 1, 1, 1, 1, 0, 1, 0], [0, 1, 1, 1, 0, 0], [0, 1, 0, 0, 1, 0, 0, 1, 0]);
    
    //gl.uniform4f(u_FragColor, rgba[0]*0.8, rgba[1]*0.8, rgba[2]*0.8,rgba[3]);
    drawTriangle3DUVNormal([1, 0, 0, 1, 1, 0, 1, 1, 1], [0, 0, 0, 1, 1, 1], [1, 0, 0, 1, 0, 0, 1, 0, 0]);
    drawTriangle3DUVNormal([1, 0, 0, 1, 0, 1, 1, 1, 1], [0, 0, 1, 0, 1, 1], [1, 0, 0, 1, 0, 0, 1, 0, 0]);

    //gl.uniform4f(u_FragColor, rgba[0]*0.7, rgba[1]*0.7, rgba[2]*0.7,rgba[3]);
    drawTriangle3DUVNormal([0, 0, 0, 0, 0, 1, 0, 1, 1], [1, 0, 0, 0, 0, 1], [-1, 0, 0, -1, 0, 0, -1, 0, 0]);
    drawTriangle3DUVNormal([0, 0, 0, 0, 1, 0, 0, 1, 1], [1, 0, 1, 1, 0, 1], [-1, 0, 0, -1, 0, 0, -1, 0, 0]);
    
    //gl.uniform4f(u_FragColor, rgba[0]*0.6, rgba[1]*0.6, rgba[2]*0.6,rgba[3]);
    drawTriangle3DUVNormal([0, 0, 0, 1, 0, 1, 1, 0, 0], [0, 1, 1, 0, 1, 1], [0, -1, 0, 0, -1, 0, 0, -1, 0]);
    drawTriangle3DUVNormal([0, 0, 0, 0, 0, 1, 1, 0, 1], [0, 1, 0, 0, 1, 0], [0, -1, 0, 0, -1, 0, 0, -1, 0]);

    //gl.uniform4f(u_FragColor, rgba[0]*0.5, rgba[1]*0.5, rgba[2]*0.5,rgba[3]);
    drawTriangle3DUVNormal([1, 0, 1, 0, 0, 1, 0, 1, 1], [0, 0, 1, 0, 1, 1], [0, 0, 1, 0, 0, 1, 0, 0, 1]);
    drawTriangle3DUVNormal([1, 0, 1, 1, 1, 1, 0, 1, 1], [0, 1, 0, 1, 1, 1], [0, 0, 1, 0, 0, 1, 0, 0, 1]);

    //gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
  }


  renderfaster() {
    var rgba = this.color;
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    gl.uniform1i(u_whichTexture, this.textureNum);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    var VERTS = [];
    //front
    VERTS = VERTS.concat([0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0]);
    VERTS = VERTS.concat([0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0]);
    //back
    VERTS = VERTS.concat([0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0]);
    VERTS = VERTS.concat([0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0]);
    //top
    VERTS = VERTS.concat([0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0]);
    VERTS = VERTS.concat([0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0]);
    //bottom
    VERTS = VERTS.concat([0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0]);
    VERTS = VERTS.concat([1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0]);
    //left
    VERTS = VERTS.concat([0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0]);
    VERTS = VERTS.concat([0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
    //right
    VERTS = VERTS.concat([1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0]);
    VERTS = VERTS.concat([1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0]);

    var UVS = [
      0, 0, 1, 1, 1, 0,
      0, 0, 0, 1, 1, 1,
      1, 0, 1, 1, 0, 0,
      0, 1, 1, 1, 0, 0,
      0, 0, 0, 1, 1, 1,
      0, 0, 1, 0, 1, 1,
      1, 0, 0, 0, 0, 1,
      1, 0, 1, 1, 0, 1,
      0, 1, 1, 0, 1, 1,
      0, 1, 0, 0, 1, 0,
      0, 0, 1, 0, 1, 1,
      0, 1, 0, 1, 1, 1
    ];

    var NORMS = [
      0, 0, -1, 0, 0, -1, 0, 0, -1,
      0, 0, -1, 0, 0, -1, 0, 0, -1,
      0, 1, 0, 0, 1, 0, 0, 1, 0,
      0, 1, 0, 0, 1, 0, 0, 1, 0,
      1, 0, 0, 1, 0, 0, 1, 0, 0,
      1, 0, 0, 1, 0, 0, 1, 0, 0,
      -1, 0, 0, -1, 0, 0, -1, 0, 0,
      -1, 0, 0, -1, 0, 0, -1, 0, 0,
      0, -1, 0, 0, -1, 0, 0, -1, 0,
      0, -1, 0, 0, -1, 0, 0, -1, 0,
      0, 0, 1, 0, 0, 1, 0, 0, 1,
      0, 0, 1, 0, 0, 1, 0, 0, 1
    ];

    drawTriangle3DUVNormal(VERTS, UVS, NORMS);
  }
}




