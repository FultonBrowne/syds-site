#!/bin/bash

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null
then
    echo "Error: ImageMagick is not installed. Install it using 'sudo apt install imagemagick' (Linux) or 'brew install imagemagick' (Mac)."
    exit 1
fi

# Check if image file is provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 input_image output_image"
    exit 1
fi

input_image="$1"
output_image="$2"

# Get image dimensions
width=$(identify -format "%w" "$input_image")
height=$(identify -format "%h" "$input_image")

# Determine the shortest side
if [ "$width" -lt "$height" ]; then
    short_side="$width"
else
    short_side="$height"
fi

# Calculate scale percentage
scale_factor=$(echo "scale=6; 600 / $short_side" | bc)

# Compute new dimensions
new_width=$(echo "$width * $scale_factor" | bc | awk '{print int($1+0.5)}')
new_height=$(echo "$height * $scale_factor" | bc | awk '{print int($1+0.5)}')

echo press enter to continue
read
# Resize image
convert "$input_image" -resize "${new_width}x${new_height}" "$output_image"

echo "Image resized to ${new_width}x${new_height} and saved as $output_image."
