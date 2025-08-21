
'''
    Implementation of insertion sort algorithm
'''
def insertion_sort(arr):
    for i in range(1, len(arr)):
        tmp = arr[i]
        j = i - 1

        while j >= 0 and tmp < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = tmp

'''
    A function used to detect missing video frames
'''
def find_missing_ranges(frames: list[int]) -> dict:

    # sort the frames
    insertion_sort(frames)

    # initialzie variables to store the results
    gaps = []
    longest_gap = None
    longest_gap_length = 0
    missing_count = 0

    # check for gaps
    for i in range(len(frames) - 1):
        start_frame = frames[i]
        end_frame = frames[i+1]
        gap_length = end_frame - start_frame - 1
        missing_count += gap_length

        if gap_length > 0:
            gaps.append([start_frame + 1, end_frame - 1])

            if gap_length > longest_gap_length:
                longest_gap_length = gap_length
                longest_gap = gaps[-1]
    
    return {"gaps": gaps, "longest_gap": longest_gap, "missing_count": missing_count}


# test case
my_frames = [1, 2, 3, 5, 6, 10, 11, 16]

result = find_missing_ranges(my_frames)

print(result)
