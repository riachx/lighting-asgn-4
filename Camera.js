/// fix all this

class Camera{
    constructor(){
        this.eye = new Vector3([0,0.5,3]);
        this.at  = new Vector3([0,0,-100]);
        this.up  = new Vector3([0,1,0]);
        this.isJumping = false; // prevent multiple jumps at the same time
        this.initialEyeY = this.eye.elements[1]; // save the initial Y position
    }
    forward(){
        var atCopy  = new Vector3(this.at.elements);
        var eyeCopy = new Vector3(this.eye.elements);
        var f = atCopy.sub(eyeCopy);
        f.elements[1] = 0; 
        f = f.normalize();
        this.eye = this.eye.add(f);
        this.at  = this.at.add(f);
    }
    
    backward(){
        var atCopy  = new Vector3(this.at.elements);
        var eyeCopy = new Vector3(this.eye.elements);        
        var f = atCopy.sub(eyeCopy);
        f.elements[1] = 0; 
        f = f.normalize();
        this.at  = this.at.sub(f);
        this.eye = this.eye.sub(f);
    }
    

    left(){
        var atCopy  = new Vector3(this.at.elements);
        var eyeCopy = new Vector3(this.eye.elements);
        var f = atCopy.sub(eyeCopy);

        f = f.normalize();
        f = f.mul(-1);
        var s = Vector3.cross(f, this.up);
        s = s.normalize();

        this.at  = this.at.add(s);
        this.eye = this.eye.add(s);
    }

    right(){
        var atCopy  = new Vector3(this.at.elements);
        var eyeCopy = new Vector3(this.eye.elements);
        var upCopy  = new Vector3(this.up.elements);
        var f = atCopy.sub(eyeCopy);

        f = f.normalize();
        var s = Vector3.cross(f, upCopy);
        s = s.normalize();
        this.at  = this.at.add(s);
        this.eye = this.eye.add(s);
    }

    panR(){
        var atCopy  = new Vector3(this.at.elements);
        var eyeCopy = new Vector3(this.eye.elements);
        var f = atCopy.sub(eyeCopy);

        var rotationMatrix = new Matrix4();
        rotationMatrix.setRotate(-2, this.up.elements[0], this.up.elements[1], this.up.elements[2]);

        var f_prime = rotationMatrix.multiplyVector3(f);

        this.at = f_prime.add(this.eye);;
    }

    panL(){
        var atCopy  = new Vector3(this.at.elements);
        var eyeCopy = new Vector3(this.eye.elements);
        var f = atCopy.sub(eyeCopy);

        var rotationMatrix = new Matrix4();
        rotationMatrix.setRotate(2, this.up.elements[0], this.up.elements[1], this.up.elements[2]);

        var f_prime = rotationMatrix.multiplyVector3(f);

        this.at = f_prime.add(this.eye);
    }

    panU(){
        var atCopy = new Vector3(this.at.elements);
        var eyeCopy = new Vector3(this.eye.elements);
        var f = atCopy.sub(eyeCopy);
        var right = Vector3.cross(f, this.up).normalize();

        var rotationMatrix = new Matrix4();
        rotationMatrix.setRotate(2, right.elements[0], right.elements[1], right.elements[2]); // Rotate up around the right vector

        var f_prime = rotationMatrix.multiplyVector3(f);
        this.at = f_prime.add(this.eye);
    }

    panD(){
        var atCopy = new Vector3(this.at.elements);
        var eyeCopy = new Vector3(this.eye.elements);
        var f = atCopy.sub(eyeCopy);
        var right = Vector3.cross(f, this.up).normalize();

        var rotationMatrix = new Matrix4();
        rotationMatrix.setRotate(-2, right.elements[0], right.elements[1], right.elements[2]); // Rotate down around the right vector

        var f_prime = rotationMatrix.multiplyVector3(f);
        this.at = f_prime.add(this.eye);
    }
// Chat GPT helped me write this function. i needed help with the math
    jump() {
        if (this.isJumping) return; // if already jumping
        this.isJumping = true;
        const jumpHeight = 1.0; // height of jump
        const duration = 250; // time of jump

        const startY = this.eye.elements[1];
        const peakY = startY + jumpHeight;

        // upwards
        const upInterval = setInterval(() => {
            if (this.eye.elements[1] < peakY) {
                this.eye.elements[1] += 0.05;
                this.at.elements[1] += 0.05;
            } else {
                clearInterval(upInterval); // clear it
                // downards
                const downInterval = setInterval(() => {
                    if (this.eye.elements[1] > startY) {
                        this.eye.elements[1] -= 0.05;
                        this.at.elements[1] -= 0.05;
                    } else {
                        this.eye.elements[1] = startY; // reset y
                        clearInterval(downInterval); // clear
                        this.isJumping = false; // no second jump
                    }
                }, duration / (jumpHeight * 20));
            }
        }, duration / (jumpHeight * 20)); 


        
    }

}