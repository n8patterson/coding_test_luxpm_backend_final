'''
This script takes in two optional arguments
a string and an integer <n> greater than or equal to 20.

It then calculates the first n odd integers and inserts
them in reverse order inbetween the input string.

It returns a json object.
'''

import argparse
import json

'''
Main function to process adding odd numbers between input string

string_to_process (str): Input string to insert odd numbers inbwtween

returns (str): Output str with n odd number inbetween each character
'''
def process_string(string_to_process='NathanPatterson'): 
    return insert_odd_numbers(find_first_n_odd_numbers(20),  string_to_process)

'''
Helper function to add odd numbers between string

odd_numbers_list (list of ints): n calculated odd numbers
string_to_process (str): Input string to insert odd numbers inbwtween

returns (str): Output str with n odd number inbetween each character
'''   
def insert_odd_numbers(odd_numbers_list, string_to_process='LuxPMsoft'):
    processed_string = ''

    for i in range(len(string_to_process)):

        odd_number_to_add = ''
        if len(odd_numbers_list)-1-i >= 0:
            odd_number_to_add = str(odd_numbers_list[len(odd_numbers_list)-1-i])
        
        if(i != len(string_to_process)-1):
            processed_string += string_to_process[i] + odd_number_to_add
        else:
            processed_string += string_to_process[i]
    return processed_string

'''
Helper function to calculate first n odd numbers

max (int): number of add numbers to calcualte

returns (list): List of first n odd numbers
'''  
def find_first_n_odd_numbers(max=20):
    odd_numbers = list(range(1, 2 * max, 2))
    return odd_numbers

'''
This is the entry point for this script

returns (json): json object of processed string
'''
def main():
    # Parser to parse two optional input arguments a string and an int n greater than or equal to 20.
    parser = argparse.ArgumentParser(description='Encrypt a string with first 20 odd numbers from 0, default 20')
    parser = argparse.ArgumentParser()
    parser.add_argument('--string', type=str,  help='Stringt to encrypt.')
    parser.add_argument('--numberodd', type=int,  help='n odd numbers from 0. Must be >= 20')
    args = parser.parse_args()

    # Check that n is greater than or equal to 20
    if args.numberodd and args.numberodd < 20:
        raise argparse.ArgumentTypeError("Minimum numberodd is 20")
    
    # Set default string to process
    string_to_process = args.string if args.string else 'NathanPatterson'

    # Process the string with n odd numbers
    processed_string = process_string(string_to_process)

    # Output json
    print(json.dumps({
        'processed_string': processed_string
    }))

if __name__ == "__main__":
    main()